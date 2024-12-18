import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  bucket?: string;
}

export function ImageUpload({ onUploadComplete, bucket = 'marina-media' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadComplete?.(publicUrl);
      
      toast({
        title: "Upload successful",
        description: "Your image has been uploaded successfully.",
      });

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isUploading}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      {isUploading ? 'Uploading...' : 'Upload Image'}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </Button>
  );
}