import { Button, Group } from '@mantine/core';
import Link from 'next/link';

const MainMenu = () => {
  return (
    <Group>
      <Button variant="subtle" component={Link} href={'/'}>
        Home
      </Button>
      <Button variant="subtle" component={Link} href={'/'}>
        Blogs
      </Button>
      <Button variant="subtle" component={Link} href={'/'}>
        About
      </Button>
      <Button variant="subtle" component={Link} href={'/contact'}>
        Contact
      </Button>
    </Group>
  );
};

export default MainMenu;
