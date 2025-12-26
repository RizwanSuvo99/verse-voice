'use client';

import { getFavorites, removeFavorite } from '@/api/favorites.mjs';
import RequireAuth from '@/components/RequireAuth';
import { Container, SimpleGrid, Loader, Center, Text, Title } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import FavouritesSingle from './FavouritesSingle';

const Favourites = () => {
  const queryClient = useQueryClient();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  const { mutate: unfavorite } = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      notifications.show({ title: 'Removed from favorites', color: 'blue' });
    },
  });

  if (isLoading) {
    return (
      <Container size={1350} className="!px-6 !py-4 !pt-[50px]">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <RequireAuth>
    <Container size={1350} className="!px-6 !py-4 !pt-[50px]">
      <Text
        component={Title}
        variant="gradient"
        className="!mb-6 !text-center !text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
      >
        My Favourites
      </Text>
      {!favorites || favorites.length === 0 ? (
        <Center py="xl">
          <Text c="dimmed" size="lg">
            No favourites yet. Start adding blogs to your favourites!
          </Text>
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {favorites.map((fav) => (
            <FavouritesSingle
              key={fav._id}
              favorite={fav}
              onRemove={() => unfavorite(fav.blog?._id)}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
    </RequireAuth>
  );
};

export default Favourites;
