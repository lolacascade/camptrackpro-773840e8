import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@supabase/auth-helpers-react';

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void;
  bucket?: string;
  children?: React.ReactNode;
  currentImage?: string;
  section?: string;
}

// List of authorized emails that can upload images
const AUTHORIZED_EMAILS = [
  // Add your authorized emails here
  'example@example.com'
];

export function ImageUpload({ 
  onUploadComplete, 
  bucket = 'marina-media', 
  children,
  currentImage,
  section = 'default'
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const isAuthorizedEmail = session?.user?.email && 
    AUTHORIZED_EMAILS.includes(session.user.email);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!session) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to upload images.",
          variant: "destructive",
        });
        return;
      }

      if (!isAuthorizedEmail) {
        toast({
          title: "Unauthorized",
          description: "You don't have permission to upload images.",
          variant: "destructive",
        });
        return;
      }

      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      
      // Include section in the file path to organize uploads
      const fileExt = file.name.split('.').pop();
      const filePath = `${section}/${Math.random()}.${fileExt}`;

      // If there's a current image, try to delete it first
      if (currentImage) {
        const oldPath = currentImage.split('/').slice(-2).join('/'); // Get section/filename
        try {
          await supabase.storage
            .from(bucket)
            .remove([oldPath]);
        } catch (error) {
          console.error('Failed to delete old image:', error);
          // Continue with upload even if delete fails
        }
      }

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: true // Enable upsert
        });

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
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your image.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // If there's a current image and user is not authorized, just show the image
  if (currentImage && !isAuthorizedEmail) {
    return <img src={currentImage} alt="Uploaded content" className="max-w-full h-auto" />;
  }

  return (
    <div onClick={() => isAuthorizedEmail && document.getElementById('fileInput')?.click()}>
      {currentImage ? (
        <div className="relative">
          <img src={currentImage} alt="Uploaded content" className="max-w-full h-auto" />
          {isAuthorizedEmail && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
              <Button variant="outline" className="bg-white">
                Change Image
              </Button>
            </div>
          )}
        </div>
      ) : (
        isAuthorizedEmail && (children || (
          <Button
            variant="outline"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        ))
      )}
      {isAuthorizedEmail && (
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      )}
    </div>
  );
}