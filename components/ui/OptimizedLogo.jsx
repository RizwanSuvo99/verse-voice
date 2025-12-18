'use client';

import Image from 'next/image';
import { useState } from 'react';

const OptimizedLogo = ({
  src,
  alt = 'Logo',
  width = 40,
  height = 40,
  fallbackSrc = 'https://placehold.co/40x40?text=Logo',
  className = '',
  priority = true,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const validSrc = imgSrc && imgSrc.trim() !== '' ? imgSrc : fallbackSrc;
  const isSvg = validSrc.toLowerCase().endsWith('.svg');

  return (
    <Image
      src={validSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized={isSvg}
      className={className}
      style={{ objectFit: 'contain' }}
      onError={() => !hasError && (setHasError(true), setImgSrc(fallbackSrc))}
    />
  );
};

export default OptimizedLogo;
