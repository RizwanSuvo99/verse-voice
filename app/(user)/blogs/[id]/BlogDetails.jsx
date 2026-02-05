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
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { readLocalStorageValue } from '@mantine/hooks';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useState } from 'react';
import '@/components/Editor/editor.css';

const BlogDetails = ({ blog }) => {
  const comments = blog.comments || [];
  const isHtml = /<[a-z][\s\S]*>/i.test(blog.content || '');
  const sanitizedContent =
    isHtml && typeof window !== 'undefined'
      ? DOMPurify.sanitize(blog.content || '')
      : blog.content || '';
  const plainParagraphs = !isHtml
    ? blog.content?.trim().split('\n\n') || []
    : [];
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
      toast.success('Comment added!');
    },
    onError: () => {
      toast.error('Failed to add comment');
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
          height={400}
          alt={blog.title}
          radius="md"
        />
      </AspectRatio>
      <Space h={'xs'} />
      <FavoriteButton blogId={blog._id} size={22} />

      {favUsers && favUsers.length > 0 && (
        <>
          <Space h={'xs'} />
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

      <Space h={'sm'} />

      {isHtml ? (
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      ) : (
        plainParagraphs.map((item, i) => (
          <div key={i}>
            <Text className="!text-[14px]">{item}</Text>
            <Space h={'sm'} />
          </div>
        ))
      )}

      <Space h={'md'} />
      <Text className="!text-xl" fw={600}>
        {comments.length} Comment{comments.length !== 1 ? 's' : ''} on &quot;
        {blog.title}&quot;
      </Text>
      <Space h={'md'} />

      {comments.map((comment) => (
        <div key={comment._id}>
          <Flex justify={'space-between'} align={'center'}>
            <Group>
              <Avatar
                radius={'xl'}
                size={'md'}
                alt={comment.createdBy?.name || 'User'}
                src={comment.createdBy?.avatar || null}
              >
                {comment.createdBy?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <div>
                <Text fw={500} className="!text-[14px]">
                  {comment.createdBy?.name || 'User'}
                </Text>
                <Text fw={400} size="xs" c="dimmed">
                  {comment.createdAt
                    ? dayjs(comment.createdAt).format('D MMM YYYY')
                    : ''}
                </Text>
              </div>
            </Group>
            <Card withBorder className="glass-card">
              <Text size="sm">{comment.text}</Text>
            </Card>
          </Flex>
          <Space h={'sm'} />
        </div>
      ))}

      <Space h={'md'} />
      <Divider size={'sm'} />
      <Space h={'md'} />
      <Text fw={600} className="!text-xl">
        Leave a comment
      </Text>
      <Space h={'xs'} />

      {isLoggedIn ? (
        <>
          <Textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            minRows={3}
            radius="md"
          />
          <Space h={'sm'} />
          <Button
            variant="gradient"
            onClick={handleSubmitComment}
            loading={isPending}
          >
            Post Comment
          </Button>
        </>
      ) : (
        <Text size="sm">
          You must be{' '}
          <Text component={Link} href={'/login'} c="cyan" span>
            logged in
          </Text>{' '}
          to post a comment.
        </Text>
      )}
    </>
  );
};

export default BlogDetails;
