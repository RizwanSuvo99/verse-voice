import { AspectRatio, Group, Image, Text, Title } from '@mantine/core';
import NextImage from 'next/image';
import Link from 'next/link';

const Logo = ({ setActive }) => {
  return (
    <Link href={'/'} onClick={() => setActive('/')} className="!no-underline">
      <Group className="!gap-2">
        <AspectRatio ratio={1}>
          <Image
            alt="classRoomWriters-logo"
            src="/assets/logo.svg"
            fit="contain"
            fallbackSrc="https://placehold.co/70x70?text=Logo"
            component={NextImage}
            width={70}
            height={70}
          />
        </AspectRatio>

        <Text
          variant="gradient"
          component={Title}
          className="!max-w-[170px] !text-[20px] !uppercase"
        >
          Class Room Writers
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
