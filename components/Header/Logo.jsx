import { AspectRatio, Group, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="!no-underline">
      <Group className="!gap-2">
        <AspectRatio ratio={1}>
          <Image
            alt="classRoomWriters-logo"
            src="/assets/logo.svg"
            fit="contain"
            fallbackSrc="https://placehold.co/36x36?text=Logo"
            width={36}
            height={36}
            className="!w-[32px] sm:!w-[40px]"
          />
        </AspectRatio>

        <Text
          variant="gradient"
          component={Title}
          className="gradient-text !max-w-[170px] !text-[13px] !font-bold !uppercase sm:!text-[16px]"
        >
          Class Room Writers
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
