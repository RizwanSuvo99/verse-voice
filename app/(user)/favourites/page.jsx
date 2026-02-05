'use client';

import { getFavorites, removeFavorite } from '@/api/favorites.mjs';
import RequireAuth from '@/components/RequireAuth';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import { Container, SimpleGrid, Center, Text, Title } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
      toast.info('Removed from favorites');
    },
  });

  if (isLoading) {
    return (
      <Container size={1500} className="!py-4 !pt-[24px]">
        <BlogGridSkeleton count={4} cols={{ base: 1, sm: 2 }} />
      </Container>
    );
  }

  return (
    <RequireAuth>
      <Container size={1500} className="!py-4 !pt-[24px]">
        <Text
          component={Title}
          variant="gradient"
          className="!mb-4 !text-center !text-[24px] !leading-[36px] md:!text-[28px]"
        >
          My Favourites
        </Text>
        {!favorites || favorites.length === 0 ? (
          <Center py="xl">
            <Text c="dimmed" size="sm">
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
