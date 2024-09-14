import { AspectRatio, Group, Image, Text, Title } from '@mantine/core';
import NextImage from 'next/image';

const Logo = () => {
  return (
    <Group className="!gap-2">
      <AspectRatio ratio={1}>
        <Image
          alt="logo-img"
          src="/assets/logo.svg"
          fit="contain"
          fallbackSrc="https://placehold.co/70x70?text=Logo"
          component={NextImage}
          width={70}
          height={70}
        />
      </AspectRatio>

      <Text variant="gradient" component={Title} className='!text-2xl'>
        ClassWriters
      </Text>
    </Group>
  );
};

export default Logo;
