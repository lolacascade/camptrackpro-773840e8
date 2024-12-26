import { Send, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/common/ImageUpload";
import { useState, useRef, useEffect } from "react";

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
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

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
      <div className="relative bg-white rounded-lg">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaInput}
          placeholder="Write a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          className="min-h-[44px] pr-24 bg-transparent text-[#0D1D1F] placeholder:text-[#0D1D1F]/50 border-none resize-none overflow-hidden py-2 px-3"
          style={{ height: textareaHeight }}
        />
        <div className="absolute bottom-1 right-1 flex gap-2">
          <ImageUpload 
            onUploadComplete={onFileUpload}
            bucket="marina-media"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-transparent"
            >
              <Image className="h-5 w-5 text-[#0D1D1F]/70" />
            </Button>
          </ImageUpload>
          <Button
            onClick={onSend}
            size="icon"
            className="h-8 w-8 bg-transparent hover:bg-transparent"
            disabled={isLoading}
          >
            <Send className="h-5 w-5 text-[#0D1D1F]/70" />
          </Button>
        </div>
      </div>
    </div>
  );
};