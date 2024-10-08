import { BackgroundImage, Card, Text } from '@mantine/core';
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
          className="!flex !h-[300px] flex-col !items-center !justify-center"
        >
          <Text className="!mb-2 !text-3xl !font-bold">{categoryName}</Text>
          <Text className="!text-2xl">{categorySize}</Text>
        </BackgroundImage>
      </Card>
    </Link>
  );
};

export default CarouselItem;
