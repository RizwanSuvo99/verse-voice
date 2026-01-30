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
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classes from './HeaderSimple.module.css';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useMutation } from '@tanstack/react-query';
import { logOut } from '@/api/logOut.mjs';

const Navbar = () => {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(pathname);
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

  // Only use the logged-in value after hydration to avoid SSR mismatch
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
  };

  return (
    <header className={`${classes.header} glass-navbar`}>
      <Container size={1350} className={`${classes.inner} !p-0 !px-6`}>
        <Logo setActive={setActive} />

        {/* Desktop Navigation */}
        <Group gap={5} visibleFrom="sm">
          {navLinks.map((link) => (
            <Button
              variant={active === link.link ? 'filled' : 'outline'}
              component={Link}
              key={link.label}
              href={link.link}
              onClick={() => setActive(link.link)}
              size="xs"
            >
              {link.label}
            </Button>
          ))}

          {hydrated && (
            <>
              <Group justify="center" grow px="md">
                <Button
                  variant="default"
                  component={Link}
                  href={'/login'}
                  className={`${loggedIn ? 'hidden' : 'block'}`}
                >
                  Log in
                </Button>
                <Button
                  component={Link}
                  href={'/register'}
                  className={`${loggedIn ? 'hidden' : 'block'}`}
                >
                  Register
                </Button>
              </Group>
              <Button
                variant="filled"
                color="red"
                className={`${!loggedIn ? 'hidden' : 'block'}`}
                onClick={handleLogOut}
              >
                Log out
              </Button>
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
              variant={active === link.link ? 'filled' : 'outline'}
              component={Link}
              key={link.label}
              href={link.link}
              onClick={() => {
                setActive(link.link);
                close();
              }}
              fullWidth
              className="!mb-4"
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
