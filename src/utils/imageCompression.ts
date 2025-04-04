
export interface CompressOptions {
  maxWidthOrHeight?: number;
  maxSizeInMB?: number;
  quality?: number;
}

/**
 * Compresses an image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns A promise that resolves to the compressed file
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  const { 
    maxWidthOrHeight = 1200, 
    maxSizeInMB = 1,
    quality = 0.8
  } = options;
  
  // If it's not an image or already small enough, return original
  if (!file.type.startsWith("image/")) {
    return file;
  }
  
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size <= maxSizeInBytes) {
    return file;
  }

  // Create image element to load the file
  const img = new Image();
  const fileUrl = URL.createObjectURL(file);
  
  try {
    // Load the image
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = fileUrl;
    });

    // Calculate new dimensions
    let width = img.width;
    let height = img.height;
    
    if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
      if (width > height) {
        height = Math.round((height * maxWidthOrHeight) / width);
        width = maxWidthOrHeight;
      } else {
        width = Math.round((width * maxWidthOrHeight) / height);
        height = maxWidthOrHeight;
      }
    }

    // Create canvas and context for resizing
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    
    // Draw image on canvas with new dimensions
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    // Get new file from canvas
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        file.type,
        quality
      );
    });

    // If still too large, compress more aggressively
    if (blob.size > maxSizeInBytes) {
      return compressImage(
        new File([blob], file.name, { type: file.type }),
        { ...options, quality: quality * 0.8 }
      );
    }

    // Return as File object
    return new File([blob], file.name, { type: file.type });
  } finally {
    // Clean up
    URL.revokeObjectURL(fileUrl);
  }
}
