'use client';

import { useVirtualList } from '@/hooks/useVirtualList';

const VIRTUALIZATION_THRESHOLD = 20;

const VirtualizedCommentList = ({
  comments,
  renderComment,
  estimateSize = 150,
}) => {
  const shouldVirtualize = comments.length > VIRTUALIZATION_THRESHOLD;

  const { parentRef, virtualizer } = useVirtualList(comments, {
    estimateSize,
    overscan: 5,
  });

  // For small lists, render normally without virtualization
  if (!shouldVirtualize) {
    return (
      <div>
        {comments.map((comment) => renderComment(comment))}
      </div>
    );
  }

  // For large lists, use virtualization
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height: '600px',
        overflow: 'auto',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => {
          const comment = comments[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderComment(comment)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedCommentList;
