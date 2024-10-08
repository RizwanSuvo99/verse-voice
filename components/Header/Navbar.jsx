'use client';

import {
  Burger,
  Button,
  Container,
  Group,
  Overlay,
  Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import classes from './HeaderSimple.module.css';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const pathname = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(pathname);
  // const value = readLocalStorageValue({ key: 'isLoggedIn' });

  const defaultLinks = [
    { link: '/', label: 'Home' },
    { link: '/blogs', label: 'Blogs' },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
  ];

  // const [links, setLinks] = useState(defaultLinks);

  /*   const [token, setToken] = useLocalStorage({
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
  }, [value]); */

  return (
    <header className={classes.header}>
      <Container size={1350} className={`${classes.inner} !p-0 !px-6`}>
        <Logo setActive={setActive} />

        {/* Desktop Navigation */}
        <Group gap={5} visibleFrom="sm">
          {defaultLinks.map((link) => (
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

          {/* Place for additional login/logout buttons */}
          {/*           <Group justify="center" grow px="md">
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
          </Button> */}

          {/* Theme toggle button for both desktop and mobile */}
          <ThemeToggle />
        </Group>

        {/* Burger Menu for Mobile */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        {/* Overlay to darken the rest of the page when menu is open */}
        {opened && (
          <Overlay opacity={0.5} className={classes.overlay} onClick={close} />
        )}

        {/* Mobile Menu - slides from the left */}
        <Paper
          className={`${classes.mobileMenu} ${opened ? classes.menuOpened : ''}`}
          withBorder
          hiddenFrom="md"
        >
          {defaultLinks.map((link) => (
            <Button
              variant={active === link.link ? 'filled' : 'outline'}
              component={Link}
              key={link.label}
              href={link.link}
              onClick={() => {
                setActive(link.link);
                close(); // Close the menu when a link is clicked
              }}
              fullWidth
              className="!mb-4"
            >
              {link.label}
            </Button>
          ))}
          {/* Theme toggle button inside the mobile menu */}
          <ThemeToggle />
        </Paper>
      </Container>
    </header>
  );
};

export default Navbar;
