'use client';
import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  const isDark = computedColorScheme === 'dark';

  return (
    <ActionIcon
      variant="subtle"
      size="md"
      radius="xl"
      onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle color scheme"
      className="theme-toggle-wrapper"
    >
      {isDark ? (
        <IconSun
          size={18}
          stroke={1.8}
          className="theme-toggle-icon"
          color="#fbbf24"
        />
      ) : (
        <IconMoon
          size={18}
          stroke={1.8}
          className="theme-toggle-icon"
          color="#6366f1"
        />
      )}
    </ActionIcon>
  );
};

export default ThemeToggle;
