import { Container, Group } from '@mantine/core';
import Logo from './Logo';
import MainMenu from './MainMenu';
import MenuSearch from './MenuSearch';

const Navbar = () => {
  return (
    <>
      <Container size={1350} className="!px-0 py-4">
        <Group justify="space-between">
          <Logo />
          <MainMenu />
          <MenuSearch />
        </Group>
      </Container>
    </>
  );
};

export default Navbar;
