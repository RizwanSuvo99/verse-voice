import { BackgroundImage, Card, Text } from '@mantine/core';

const CarouselItem = ({ backUrl, categoryName, categorySize }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="!p-0">
      <BackgroundImage
        src={backUrl}
        className="!flex !h-[300px] flex-col !items-center !justify-center"
      >
        <Text className="!mb-2 !text-3xl !font-bold">{categoryName}</Text>
        <Text className="!text-2xl">{categorySize}</Text>
      </BackgroundImage>
    </Card>
  );
};

export default CarouselItem;
