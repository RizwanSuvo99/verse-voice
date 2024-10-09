import { BackgroundImage, Card, Overlay, Text } from '@mantine/core';
import Link from 'next/link';

const CarouselItem = ({ backUrl, categoryName, categorySize }) => {
  return (
    <Link
      href={`/category/${categoryName.toLowerCase()}`}
      className="!no-underline"
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder className="!p-0">
        <BackgroundImage
          src={backUrl}
          className="!relative !flex !h-[300px] flex-col !items-center !justify-center"
        >
          {/* Overlay with opacity */}
          <Overlay opacity={0.6} color="#000" zIndex={1} />

          {/* Text content */}
          <Text
            className="!mb-2 !text-3xl !font-bold !text-white"
            style={{ zIndex: 2 }}
          >
            {categoryName}
          </Text>
          <Text className="!text-2xl !text-white" style={{ zIndex: 2 }}>
            {categorySize}
          </Text>
        </BackgroundImage>
      </Card>
    </Link>
  );
};

export default CarouselItem;
