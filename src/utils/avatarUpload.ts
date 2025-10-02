import { supabase } from "@/integrations/supabase/client";

export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
  }

  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

export const deleteAvatar = async (avatarUrl: string, userId: string): Promise<void> => {
  if (!avatarUrl.includes('/avatars/')) return;
  
  // Extract file path from URL
  const urlParts = avatarUrl.split('/avatars/');
  if (urlParts.length < 2) return;
  
  const filePath = urlParts[1];
  
  // Only delete if the path starts with the user's ID (security check)
  if (!filePath.startsWith(userId)) {
    throw new Error('Unauthorized: Cannot delete this avatar');
  }

  const { error } = await supabase.storage
    .from('avatars')
    .remove([filePath]);

  if (error) {
    throw new Error(`Failed to delete avatar: ${error.message}`);
  }
};
