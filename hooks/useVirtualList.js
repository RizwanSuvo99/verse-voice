'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

export const useVirtualList = (items, options = {}) => {
  const { estimateSize = 100, overscan = 5 } = options;
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
  });

  return { parentRef, virtualizer };
};
