'use client';

import { createComment } from '@/api/comments.mjs';
import { getFavoritedUsers } from '@/api/favorites.mjs';
import FavoriteButton from '@/components/FavoriteButton';
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Space,
  Text,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { readLocalStorageValue } from '@mantine/hooks';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

const BlogDetails = ({ blog }) => {
  const data = blog.content?.trim().split('\n\n') || [];
  const comments = blog.comments || [];
  const isLoggedIn = readLocalStorageValue({ key: 'isLoggedIn' });
  const [commentText, setCommentText] = useState('');
  const [showAllFavUsers, setShowAllFavUsers] = useState(false);
  const queryClient = useQueryClient();

  const { data: favUsers } = useQuery({
    queryKey: ['favoritedUsers', blog._id],
    queryFn: () => getFavoritedUsers(blog._id),
    enabled: !!blog._id,
  });

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['blog', blog._id] });
      notifications.show({ title: 'Comment added!', color: 'green' });
    },
    onError: () => {
      notifications.show({ title: 'Failed to add comment', color: 'red' });
    },
  });

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    addComment({ blogId: blog._id, text: commentText });
  };

  const displayedFavUsers = showAllFavUsers ? favUsers : favUsers?.slice(0, 5);

  return (
    <>
      <AspectRatio ratio={1}>
        <Image
          src={blog.blogPicUrl}
          height={500}
          alt={blog.title}
          radius="md"
        />
      </AspectRatio>
      <Space h={'sm'} />
      <FavoriteButton blogId={blog._id} size={24} />

      {/* Who favorited this blog */}
      {favUsers && favUsers.length > 0 && (
        <>
          <Space h={'sm'} />
          <Text fw={500} fz="sm" c="dimmed">
            Favorited by:
          </Text>
          <Space h={4} />
          <Group gap="xs">
            <Avatar.Group>
              {displayedFavUsers.map((u) => (
                <Tooltip key={u._id} label={u.name} withArrow>
                  <Avatar src={u.avatar} radius="xl" size="sm" alt={u.name}>
                    {u.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
              {!showAllFavUsers && favUsers.length > 5 && (
                <Avatar
                  radius="xl"
                  size="sm"
                  onClick={() => setShowAllFavUsers(true)}
                  style={{ cursor: 'pointer' }}
                >
                  +{favUsers.length - 5}
                </Avatar>
              )}
            </Avatar.Group>
            <Text fz="xs" c="dimmed">
              {favUsers.length === 1
                ? `${favUsers[0].name} favorited this`
                : favUsers.length <= 3
                  ? `${favUsers.map((u) => u.name).join(', ')} favorited this`
                  : `${favUsers[0].name} and ${favUsers.length - 1} others favorited this`}
            </Text>
          </Group>
        </>
      )}

      <Space h={'md'} />

      {data.map((item, i) => (
        <div key={i}>
          <Text className="!text-[18px]">{item}</Text>
          <Space h={'md'} />
        </div>
      ))}

      <Space h={'xl'} />
      <Text className="!text-3xl">
        {comments.length} Comment{comments.length !== 1 ? 's' : ''} on &quot;{blog.title}&quot;
      </Text>
      <Space h={'xl'} />

      {comments.map((comment) => (
        <div key={comment._id}>
          <Flex justify={'space-between'} align={'center'}>
            <Group>
              <Avatar
                radius={'xl'}
                size={'lg'}
                alt={comment.createdBy?.name || 'User'}
                src={comment.createdBy?.avatar || null}
              >
                {comment.createdBy?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div>
                <Text fw={500} className="!text-[16px]">
                  {comment.createdBy?.name || 'User'}
                </Text>
                <Text fw={400} className="!text-xs">
                  {comment.createdAt
                    ? dayjs(comment.createdAt).format('D MMM YYYY')
                    : ''}
                </Text>
              </div>
            </Group>
            <Card className="glass-card-static">
              <Text>{comment.text}</Text>
            </Card>
          </Flex>
          <Space h={'md'} />
        </div>
      ))}

      <Space h={'xl'} />
      <Divider size={'sm'} />
      <Space h={'xl'} />
      <Text fw={500} className="!text-3xl">
        Leave a comment
      </Text>
      <Space h={'sm'} />

      {isLoggedIn ? (
        <>
          <Textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            minRows={3}
            radius="md"
          />
          <Space h={'md'} />
          <Button
            variant="gradient"
            onClick={handleSubmitComment}
            loading={isPending}
          >
            Post Comment
          </Button>
        </>
      ) : (
        <Text>
          You must be{' '}
          <Text component={Link} href={'/login'} className="!text-blue-500">
            logged in
          </Text>{' '}
          to post a comment.
        </Text>
      )}
    </>
  );
};

export default BlogDetails;
