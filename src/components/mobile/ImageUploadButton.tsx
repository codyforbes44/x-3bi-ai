import { OptimizedImage } from '@/components/ui/optimized-image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';
import { useNativeCamera } from '@/hooks/useNativeCamera';
import { useNativePlatform } from '@/hooks/useNativePlatform';
import { toast } from 'sonner';

interface ImageUploadButtonProps {
  onImageSelect: (imageData: string) => void;
  label?: string;
}

export function ImageUploadButton({ onImageSelect, label = "Upload Image" }: ImageUploadButtonProps) {
  const { takePicture } = useNativeCamera();
  const { isNative } = useNativePlatform();
  const [preview, setPreview] = useState<string | null>(null);

  const handleNativeCamera = async () => {
    const photo = await takePicture();
    if (photo?.dataUrl) {
      setPreview(photo.dataUrl);
      onImageSelect(photo.dataUrl);
      toast.success('Photo captured');
    }
  };

  const handleWebUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setPreview(dataUrl);
        onImageSelect(dataUrl);
        toast.success('Image uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageSelect('');
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <Card className="relative overflow-hidden">
          <OptimizedImage src={preview} alt="Preview" loading="lazy" className="w-full h-48 object-cover" />
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ) : (
        <div className="flex gap-2">
          {isNative ? (
            <Button onClick={handleNativeCamera} className="flex-1">
              <Camera className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ) : (
            <Button asChild className="flex-1">
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                {label}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleWebUpload}
                />
              </label>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
