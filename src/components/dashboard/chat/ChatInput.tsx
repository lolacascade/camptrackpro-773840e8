import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/common/ImageUpload";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  onFileUpload: (url: string) => void;
  attachments: string[];
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  isLoading,
  onFileUpload,
  attachments 
}: ChatInputProps) => {
  return (
    <div className="space-y-2">
      {attachments.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {attachments.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt="Uploaded" 
              className="h-16 w-16 object-cover rounded"
            />
          ))}
        </div>
      )}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write a question"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            className="min-h-[44px] bg-white text-[#0D1D1F] placeholder:text-[#0D1D1F]/50 border-none resize-none overflow-hidden"
            rows={1}
            style={{ height: 'auto' }}
          />
        </div>
        <div className="flex gap-2">
          <ImageUpload onUploadComplete={onFileUpload}>
            <Button 
              size="icon"
              variant="ghost"
              className="bg-white hover:bg-white/90 text-[#0D1D1F]"
              disabled={isLoading}
            >
              <Image className="h-4 w-4" />
            </Button>
          </ImageUpload>
          <Button 
            onClick={onSend} 
            size="icon"
            className="bg-[#C0CCAB] hover:bg-[#C0CCAB]/90 text-[#0D1D1F]"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}