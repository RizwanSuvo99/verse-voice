'use client';
import { BackgroundImage, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

const WithBackgroundImage = ({ children }) => {
  const { colorScheme } = useMantineColorScheme();
  const [isDark, setIsDark] = useState(colorScheme);

  useEffect(() => {
    setIsDark(colorScheme);
  }, [colorScheme]);

  const bgUrl = isDark === 'dark' ? 'patterns.png' : 'patternsWhite.png';

  return <BackgroundImage src={`/assets/${bgUrl}`}>{children}</BackgroundImage>;
};

export default WithBackgroundImage;
