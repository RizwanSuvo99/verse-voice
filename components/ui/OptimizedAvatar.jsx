'use client';

import Image from 'next/image';
import { useState } from 'react';
import { optimizeAvatarUrl } from '@/utils/optimizeCloudinaryUrl';

const SIZE_MAP = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

const OptimizedAvatar = ({
  src,
  alt = 'Avatar',
  size = 40,
  preset,
  name = '',
  className = '',
  style = {},
}) => {
  const [hasError, setHasError] = useState(false);

  const actualSize = preset ? SIZE_MAP[preset] : size;
  const optimizedSrc = optimizeAvatarUrl(src, actualSize);
  const initials = name ? name.charAt(0).toUpperCase() : '?';
  const showFallback = !src || hasError;

  const containerStyle = {
    width: actualSize,
    height: actualSize,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: showFallback ? 'var(--mantine-color-gray-4)' : 'transparent',
    flexShrink: 0,
    ...style,
  };

  if (showFallback) {
    return (
      <div style={containerStyle} className={className}>
        <span style={{ fontSize: actualSize * 0.4, fontWeight: 500, color: 'var(--mantine-color-gray-7)' }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={actualSize}
        height={actualSize}
        onError={() => setHasError(true)}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default OptimizedAvatar;
