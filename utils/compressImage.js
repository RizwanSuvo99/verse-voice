/**
 * Compresses an image file using canvas API
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.maxSizeMB - Maximum file size in MB (default: 1)
 * @param {number} options.maxWidthOrHeight - Maximum width or height in pixels (default: 1920)
 * @param {number} options.quality - JPEG quality 0-1 (default: 0.8)
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = (file, options = {}) => {
  const {
    maxSizeMB = 1,
    maxWidthOrHeight = 1920,
    quality = 0.8,
  } = options;

  return new Promise((resolve, reject) => {
    // If file is not an image, return as is
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    // If file is already small enough, return as is
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size <= maxSizeBytes) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
          if (width > height) {
            height = Math.round((height * maxWidthOrHeight) / width);
            width = maxWidthOrHeight;
          } else {
            width = Math.round((width * maxWidthOrHeight) / height);
            height = maxWidthOrHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob with quality setting
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }

            // Create a new File from the blob
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            // If still too large, try with lower quality
            if (compressedFile.size > maxSizeBytes && quality > 0.5) {
              compressImage(file, {
                maxSizeMB,
                maxWidthOrHeight,
                quality: quality - 0.1,
              })
                .then(resolve)
                .catch(reject);
            } else {
              resolve(compressedFile);
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Helper to compress image with toast feedback
 * @param {File} file - The image file to compress
 * @param {Function} toast - Toast function for notifications
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImageWithFeedback = async (file, showToast) => {
  if (!file) return null;

  const originalSize = (file.size / 1024 / 1024).toFixed(2);

  try {
    const compressed = await compressImage(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      quality: 0.8,
    });

    const newSize = (compressed.size / 1024 / 1024).toFixed(2);

    if (compressed.size < file.size) {
      showToast?.(`Image compressed: ${originalSize}MB → ${newSize}MB`);
    }

    return compressed;
  } catch (error) {
    console.error('Image compression failed:', error);
    return file; // Return original if compression fails
  }
};
