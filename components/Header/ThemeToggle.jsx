'use client';
import {
  rem,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="lg"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
    />
  );
};

export default ThemeToggle;
