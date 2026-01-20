import { memo } from 'react';
import { OptimizedImage } from '@/components/ui';
import { Card, Text } from '@mantine/core';
import Link from 'next/link';

const CarouselItem = memo(({ backUrl, categoryName, categorySize }) => {
  return (
    <Link
      href={`/category/${categoryName.toLowerCase()}`}
      className="!no-underline"
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="category-card !p-0"
      >
        <div
          className="!relative !flex !h-[220px] flex-col !items-center !justify-center"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <OptimizedImage
            src={backUrl}
            alt={categoryName}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              backdropFilter: 'blur(2px)',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            }}
          />
          <Text
            className="!mb-1 !text-xl !font-bold !text-white"
            style={{ zIndex: 2 }}
          >
            {categoryName}
          </Text>
          <Text className="!text-lg !text-white" style={{ zIndex: 2 }}>
            {categorySize}
          </Text>
        </div>
      </Card>
    </Link>
  );
});

CarouselItem.displayName = 'CarouselItem';

export default CarouselItem;
