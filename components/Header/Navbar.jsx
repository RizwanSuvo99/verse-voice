'use client';

import {
  Burger,
  Button,
  Container,
  Group,
  Overlay,
  Paper,
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import classes from './HeaderSimple.module.css';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useMutation } from '@tanstack/react-query';
import { logOut } from '@/api/logOut.mjs';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [token, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  const loggedIn = hydrated && isLoggedIn && !!token;

  const defaultLinks = [
    { link: '/', label: 'Home' },
    { link: '/blogs', label: 'Blogs' },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
  ];

  const loggedInLinks = [
    ...defaultLinks,
    { link: '/favourites', label: 'Favourites' },
    { link: '/my-blogs', label: 'My Blogs' },
    { link: '/request-blog', label: 'Request Blog' },
    { link: '/my-requests', label: 'My Requests' },
    { link: '/profile', label: 'Profile' },
  ];

  const navLinks = loggedIn ? loggedInLinks : defaultLinks;

  const { mutate } = useMutation({
    mutationFn: logOut,
  });

  const handleLogOut = () => {
    mutate();
    setToken(null);
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className={`${classes.header} glass-navbar`}>
      <Container size={1500} className={classes.inner}>
        <Logo />

        {/* Desktop Navigation */}
        <Group gap={2} visibleFrom="sm">
          {navLinks.map((link) => (
            <Button
              variant={pathname === link.link ? 'light' : 'subtle'}
              component={Link}
              key={link.label}
              href={link.link}
              size="compact-md"
            >
              {link.label}
            </Button>
          ))}

          {hydrated && (
            <>
              {!loggedIn && (
                <Group gap={4} px="xs">
                  <Button
                    variant="subtle"
                    component={Link}
                    href={'/login'}
                    size="compact-sm"
                  >
                    Log in
                  </Button>
                  <Button
                    variant="gradient"
                    className="glow-btn"
                    component={Link}
                    href={'/register'}
                    size="compact-sm"
                  >
                    Register
                  </Button>
                </Group>
              )}
              {loggedIn && (
                <Button
                  variant="subtle"
                  color="red"
                  size="compact-sm"
                  onClick={handleLogOut}
                >
                  Log out
                </Button>
              )}
            </>
          )}

          <ThemeToggle />
        </Group>

        {/* Burger Menu for Mobile */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        {/* Overlay */}
        {opened && (
          <Overlay opacity={0.5} className={classes.overlay} onClick={close} />
        )}

        {/* Mobile Menu */}
        <Paper
          className={`${classes.mobileMenu} ${opened ? classes.menuOpened : ''}`}
          withBorder
          hiddenFrom="md"
        >
          {navLinks.map((link) => (
            <Button
              variant={pathname === link.link ? 'light' : 'subtle'}
              component={Link}
              key={link.label}
              href={link.link}
              onClick={close}
              fullWidth
              className="!mb-2"
            >
              {link.label}
            </Button>
          ))}
          <ThemeToggle />
        </Paper>
      </Container>
    </header>
  );
};

export default Navbar;
