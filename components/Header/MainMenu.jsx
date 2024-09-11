// import { Button, Group } from '@mantine/core';
// import Link from 'next/link';

// const MainMenu = () => {
//   return (
//     <Group>
//       <Button variant="subtle" component={Link} href={'/'}>
//         Home
//       </Button>
//       <Button variant="subtle" component={Link} href={'/'}>
//         Blogs
//       </Button>
//       <Button variant="subtle" component={Link} href={'/about'}>
//         About
//       </Button>
//       <Button variant="subtle" component={Link} href={'/contact'}>
//         Contact
//       </Button>
//     </Group>
//   );
// };

// export default MainMenu;

'use client';

import { Burger, Button, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useState } from 'react';
import classes from './HeaderSimple.module.css';
import ThemeToggle from './ThemeToggle';

const links = [
  { link: '/home', label: 'Home' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
];
const MainMenu = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size={1350} className={classes.inner}>
        <MantineLogo size={28} />
        <Group gap={5} visibleFrom="md">
          {items}
          <Group justify="center" grow px="md">
            <Button variant="default">Log in</Button>
            <Button>Register</Button>
          </Group>
          <ThemeToggle />
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Container>
    </header>
  );
};

export default MainMenu;
