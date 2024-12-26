import { useState, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChatInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  attachments: string[];
  onFileUpload: (url: string) => void;
}

export const ChatInputArea = ({ 
  value, 
  onChange, 
  onSend, 
  isLoading,
  attachments,
  onFileUpload 
}: ChatInputAreaProps) => {
  const handlePaste = async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (!file) continue;

        const fileExt = file.name.split('.').pop() || 'png';
        const filePath = `${Math.random()}.${fileExt}`;

        try {
          const { error: uploadError } = await supabase.storage
            .from('marina-media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('marina-media')
            .getPublicUrl(filePath);

          onFileUpload(publicUrl);
        } catch (error: any) {
          toast.error("Failed to upload pasted image");
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div className="p-2 bg-[#0D1D1F]/80 backdrop-blur-sm">
      <ChatInput
        value={value}
        onChange={onChange}
        onSend={onSend}
        isLoading={isLoading}
        onFileUpload={onFileUpload}
        attachments={attachments}
      />
    </div>
  );
};