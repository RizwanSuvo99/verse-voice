/**
 * Transforms a Cloudinary URL to add optimization parameters
 * @param {string} url - The original Cloudinary URL
 * @param {Object} options - Transformation options
 * @param {number} options.width - Max width (default: 1200)
 * @param {number} options.quality - Quality 1-100 (default: 90)
 * @param {boolean} options.autoFormat - Auto format (WebP/AVIF) (default: true)
 * @returns {string} - Optimized URL or original if not Cloudinary
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;

  // Check if it's a Cloudinary URL
  const cloudinaryPattern = /^https?:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\//;
  if (!cloudinaryPattern.test(url)) {
    return url; // Not a Cloudinary URL, return as-is
  }

  const { width = 1200, quality = 90, autoFormat = true } = options;

  // Build transformation string
  const transforms = [];
  if (autoFormat) transforms.push('f_auto');
  if (quality) transforms.push(`q_${quality}`);
  if (width) transforms.push(`w_${width}`, 'c_limit');

  const transformString = transforms.join(',');

  // Check if URL already has transformations
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const beforeUpload = url.slice(0, uploadIndex + 8); // includes '/upload/'
  const afterUpload = url.slice(uploadIndex + 8);

  // Check if there are already transformations (starts with a transform like f_, w_, q_, etc.)
  const hasTransforms = /^[a-z]+_/.test(afterUpload);

  if (hasTransforms) {
    // Already has transforms, prepend our optimizations
    return `${beforeUpload}${transformString},${afterUpload}`;
  } else {
    // No existing transforms, add ours
    return `${beforeUpload}${transformString}/${afterUpload}`;
  }
}

/**
 * Optimizes URL for avatars (smaller size)
 */
export function optimizeAvatarUrl(url, size = 80) {
  return optimizeCloudinaryUrl(url, { width: size * 2, quality: 85 }); // 2x for retina
}

/**
 * Optimizes URL for thumbnails
 */
export function optimizeThumbnailUrl(url) {
  return optimizeCloudinaryUrl(url, { width: 400, quality: 80 });
}

export default optimizeCloudinaryUrl;
