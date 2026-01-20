'use client';

import { checkFavorite, getFavoriteCount } from '@/api/favorites.mjs';
import { useToggleFavorite } from '@/hooks/mutations';
import { ActionIcon, Group, Text, Tooltip, rem } from '@mantine/core';
import { toast } from 'sonner';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const FavoriteButton = ({ blogId, size = 20 }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const isLoggedIn = hydrated
    ? (() => {
        try {
          const token = JSON.parse(localStorage.getItem('token') || 'null');
          const logged = JSON.parse(
            localStorage.getItem('isLoggedIn') || 'false',
          );
          return !!token && !!logged;
        } catch {
          return false;
        }
      })()
    : false;

  const { data: countData } = useQuery({
    queryKey: ['favoriteCount', blogId],
    queryFn: () => getFavoriteCount(blogId),
    enabled: !!blogId,
  });

  const { data: checkData } = useQuery({
    queryKey: ['favoriteCheck', blogId],
    queryFn: () => checkFavorite(blogId),
    enabled: !!blogId && isLoggedIn,
  });

  const isFavorited = checkData?.isFavorited || false;
  const count = countData?.count || 0;

  const { mutate: toggleFavorite, isPending } = useToggleFavorite(blogId, isFavorited);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      toast('Please login to add favorites');
      return;
    }
    toggleFavorite();
  };

  return (
    <Group gap={4} wrap="nowrap">
      <Tooltip
        label={
          isLoggedIn
            ? isFavorited
              ? 'Remove from favorites'
              : 'Add to favorites'
            : 'Login to favorite'
        }
      >
        <ActionIcon
          variant="subtle"
          color={isFavorited ? 'red' : 'gray'}
          onClick={handleClick}
          loading={isPending}
          size={size + 8}
        >
          {isFavorited ? (
            <IconHeartFilled style={{ width: rem(size), height: rem(size) }} />
          ) : (
            <IconHeart style={{ width: rem(size), height: rem(size) }} />
          )}
        </ActionIcon>
      </Tooltip>
      <Text fz="xs" c="dimmed">
        {count}
      </Text>
    </Group>
  );
};

export default FavoriteButton;
