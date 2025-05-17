import { getImageFromLocalStorage, getSetting } from '@/services/settingsService';
import { AspectRatio, Group, Image, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Logo = ({ setActive }) => {
  const [logoSrc, setLogoSrc] = useState('/assets/logo.svg');
  
  useEffect(() => {
    // Try to get the custom logo from localStorage
    const customLogo = getImageFromLocalStorage('mainLogo', null);
    if (customLogo) {
      setLogoSrc(customLogo);
    } else {
      // Fall back to the setting or default
      setLogoSrc(getSetting('logoPath'));
    }
  }, []);

  return (
    <Link href={'/'} onClick={() => setActive('/')} className="!no-underline">
      <Group className="!gap-2">
        <AspectRatio ratio={1}>
          <Image
            alt="classRoomWriters-logo"
            src={logoSrc}
            fit="contain"
            fallbackSrc="https://placehold.co/70x70?text=Logo"
            width={70}
            height={70}
            className="!w-[40px] sm:!w-[70px]"
          />
        </AspectRatio>

        <Text
          variant="gradient"
          component={Title}
          className="!max-w-[170px] !text-[15px] !uppercase sm:!text-[20px]"
        >
          Class Room Writers
        </Text>
      </Group>
    </Link>
  );
};

export default Logo;
