'use client';

import { logOut } from '@/api/logOut.mjs';
import { Burger, Button, Container, Group } from '@mantine/core';
import {
  readLocalStorageValue,
  useDisclosure,
  useLocalStorage,
} from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classes from './HeaderSimple.module.css';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(pathname);
  const value = readLocalStorageValue({ key: 'isLoggedIn' });

  const defaultLinks = [
    { link: '/', label: 'Home' },
    { link: '/blogs', label: 'Blogs' },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
  ];

  const [links, setLinks] = useState(defaultLinks);

  const [token, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage({
    key: 'isLoggedIn',
    defaultValue: false,
  });

  const { mutate } = useMutation({
    mutationFn: logOut,
  });

  const handleLogOut = () => {
    mutate();
    setToken(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (value) {
      setLinks((prev) => {
        return [
          ...prev,
          {
            link: '/favourites',
            label: 'Favourites',
          },
        ];
      });
    } else {
      setLinks(defaultLinks);
    }
  }, [value]);

  return (
    <header className={classes.header}>
      <Container size={1350} className={`${classes.inner} !p-0`}>
        <Logo />
        <Group gap={5} visibleFrom="md">
          {links.map((link) => (
            <Button
              variant={active === link.link ? 'filled' : 'outline'}
              component={Link}
              key={link.label}
              href={link.link}
              onClick={() => setActive(link.link)}
            >
              {link.label}
            </Button>
          ))}

          <Group justify="center" grow px="md">
            <Button
              variant="default"
              component={Link}
              href={'/login'}
              className={`${value ? 'hidden' : 'block'}`}
            >
              Log in
            </Button>
            <Button
              component={Link}
              href={'/register'}
              className={`${value ? 'hidden' : 'block'}`}
            >
              Register
            </Button>
          </Group>
          <Button
            variant="filled"
            color="red"
            className={`${!value ? 'hidden' : 'block'}`}
            onClick={handleLogOut}
          >
            Log out
          </Button>
          <ThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Container>
    </header>
  );
};

export default Navbar;
