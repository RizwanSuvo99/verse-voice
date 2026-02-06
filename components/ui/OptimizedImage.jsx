'use client';

import Image from 'next/image';
import { useState } from 'react';
import { optimizeCloudinaryUrl } from '@/utils/optimizeCloudinaryUrl';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  style = {},
  fallbackSrc = 'https://placehold.co/400x300?text=Image',
}) => {
  const optimizedSrc = optimizeCloudinaryUrl(src);
  const [imgSrc, setImgSrc] = useState(optimizedSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const validSrc = imgSrc && imgSrc.trim() !== '' ? imgSrc : fallbackSrc;

  if (fill) {
    return (
      <Image
        src={validSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={{ objectFit: 'cover', ...style }}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
      onError={handleError}
    />
  );
};

export default OptimizedImage;
