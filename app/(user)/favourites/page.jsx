import { Container, SimpleGrid } from '@mantine/core';
import FavouritesSingle from './FavouritesSingle';

const Favourites = () => {
  return (
    <Container size={1350} className="!px-0 !py-4">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <FavouritesSingle />
        <FavouritesSingle />
        <FavouritesSingle />
        <FavouritesSingle />
        <FavouritesSingle />
        <FavouritesSingle />
        <FavouritesSingle />
      </SimpleGrid>
    </Container>
  );
};

export default Favourites;
