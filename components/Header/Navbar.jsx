'use client';

import { Burger, Button, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import classes from './HeaderSimple.module.css';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const links = [
  { link: '/', label: 'Home' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
];
const Navbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);

  return (
    <header className={classes.header}>
      <Container size={1350} className={`${classes.inner} !p-0`}>
        {/* <MantineLogo size={28} /> */}
        <Logo />
        <Group gap={5} visibleFrom="md">
          {links.map((link) => (
            <Button
              component={Link}
              key={link.label}
              href={link.link}
              // className={classes.link}
              // data-active={active === link.link || undefined}
              // onClick={(event) => {
              //   event.preventDefault();
              //   setActive(link.link);
              // }}
            >
              {link.label}
            </Button>
          ))}
          <Group justify="center" grow px="md">
            <Button variant="default" component={Link} href={'/login'}>
              Log in
            </Button>
            <Button component={Link} href={'/register'}>
              Register
            </Button>
          </Group>
          <ThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Container>
    </header>
  );
};

export default Navbar;
