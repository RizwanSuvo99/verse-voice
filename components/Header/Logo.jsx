import { OptimizedLogo } from '@/components/ui';
import { Group, Text, Title } from '@mantine/core';
import Link from 'next/link';

const Logo = ({ siteTitle = 'Class Room Writers', siteLogo = '/assets/logo.svg' }) => {
  return (
    <Link href={'/'} className="!no-underline">
      <Group className="!gap-2">
        <OptimizedLogo
          src={siteLogo}
          alt="site-logo"
          width={40}
          height={40}
          fallbackSrc="https://placehold.co/36x36?text=Logo"
          className="!w-[32px] sm:!w-[40px]"
        />

        <Text
          variant="gradient"
          component={Title}
          className="gradient-text !max-w-[170px] !text-[13px] !font-bold !uppercase sm:!text-[16px]"
        >
          {siteTitle}
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
