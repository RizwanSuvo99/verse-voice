'use client';

import { getFavoritedUsers } from '@/api/favorites.mjs';
import FavoriteButton from '@/components/FavoriteButton';
import { useAddComment, useDeleteComment, useReportComment } from '@/hooks/mutations';
import { OptimizedImage, OptimizedAvatar } from '@/components/ui';
import {
  ActionIcon,
  AspectRatio,
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  Select,
  Space,
  Text,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCornerDownRight, IconFlag, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { readLocalStorageValue } from '@mantine/hooks';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import Link from 'next/link';
import { useState, memo } from 'react';
import '@/components/Editor/editor.css';

// CommentItem component moved outside to prevent re-creation on parent re-render
const CommentItem = memo(function CommentItem({
  comment,
  isReply = false,
  replies,
  isLoggedIn,
  currentUser,
  isAdmin,
  replyingTo,
  setReplyingTo,
  replyText,
  setReplyText,
  handleSubmitReply,
  isPending,
  openReport,
  deleteCommentMutate,
  canDeleteComment,
}) {
  const commentReplies = replies.filter((r) => r.parentComment === comment._id);
  const isOptimistic = comment._isOptimistic;

  return (
    <div style={{ marginLeft: isReply ? '32px' : 0, opacity: isOptimistic ? 0.7 : 1 }}>
      <Flex gap="sm" align="flex-start">
        <OptimizedAvatar
          src={comment.createdBy?.avatar}
          name={comment.createdBy?.name || 'User'}
          preset={isReply ? 'sm' : 'md'}
          alt={comment.createdBy?.name || 'User'}
        />
        <div style={{ flex: 1 }}>
          <Group justify="space-between" wrap="nowrap">
            <div>
              <Text fw={500} fz={isReply ? 'xs' : 'sm'}>
                {comment.createdBy?.name || 'User'}
              </Text>
              <Text fz="xs" c="dimmed">
                {comment.createdAt ? dayjs(comment.createdAt).format('D MMM YYYY HH:mm') : ''}
                {isOptimistic && ' (sending...)'}
              </Text>
            </div>
            {isLoggedIn && !isOptimistic && (
              <Group gap={4}>
                {!isReply && (
                  <Tooltip label="Reply">
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                    >
                      <IconCornerDownRight size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
                {currentUser && comment.createdBy?._id !== currentUser._id && (
                  <Tooltip label="Report">
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      color="yellow"
                      onClick={() => openReport(comment)}
                    >
                      <IconFlag size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
                {canDeleteComment(comment) && (
                  <Tooltip label="Delete">
                    <ActionIcon
                      variant="subtle"
                      size="sm"
                      color="red"
                      onClick={() =>
                        modals.openConfirmModal({
                          title: 'Delete Comment',
                          children: 'Are you sure you want to delete this comment? This action cannot be undone.',
                          labels: { confirm: 'Delete', cancel: 'Cancel' },
                          confirmProps: { color: 'red' },
                          onConfirm: () => deleteCommentMutate(comment._id),
                        })
                      }
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            )}
          </Group>
          <Card withBorder mt="xs" p="sm" className="glass-card">
            <Text size="sm">{comment.text}</Text>
          </Card>

          {/* Reply input */}
          {replyingTo === comment._id && (
            <div style={{ marginTop: '8px' }}>
              <Textarea
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                minRows={2}
                size="sm"
              />
              <Group mt="xs" gap="xs">
                <Button size="xs" variant="gradient" onClick={() => handleSubmitReply(comment._id)} loading={isPending}>
                  Reply
                </Button>
                <Button size="xs" variant="subtle" onClick={() => { setReplyingTo(null); setReplyText(''); }}>
                  Cancel
                </Button>
              </Group>
            </div>
          )}

          {/* Nested replies */}
          {commentReplies.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {commentReplies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  isReply
                  replies={replies}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  isAdmin={isAdmin}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  handleSubmitReply={handleSubmitReply}
                  isPending={isPending}
                  openReport={openReport}
                  deleteCommentMutate={deleteCommentMutate}
                  canDeleteComment={canDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      </Flex>
      <Space h="sm" />
    </div>
  );
});

const BlogDetails = ({ blog, currentUser }) => {
  const comments = blog.comments || [];
  const replies = blog.replies || [];
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
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showAllFavUsers, setShowAllFavUsers] = useState(false);
  const [reportModalOpened, { open: openReportModal, close: closeReportModal }] = useDisclosure(false);
  const [reportingComment, setReportingComment] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const isAdmin = currentUser?.isSuperUser === true;

  const { data: favUsers } = useQuery({
    queryKey: ['favoritedUsers', blog._id],
    queryFn: () => getFavoritedUsers(blog._id),
    enabled: !!blog._id,
  });

  // Use optimistic mutation hooks
  const { mutate: addComment, isPending } = useAddComment(blog._id, currentUser, {
    onSuccess: () => {
      setCommentText('');
      setReplyText('');
      setReplyingTo(null);
    },
  });

  const { mutate: deleteCommentMutate } = useDeleteComment(blog._id);

  const { mutate: reportMutate, isPending: isReporting } = useReportComment({
    onSuccess: () => {
      closeReportModal();
      setReportingComment(null);
      setReportReason('');
      setReportDescription('');
    },
  });

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    addComment({ blogId: blog._id, text: commentText });
  };

  const handleSubmitReply = (parentId) => {
    if (!replyText.trim()) return;
    addComment({ blogId: blog._id, text: replyText, parentCommentId: parentId });
  };

  const handleReport = () => {
    if (!reportReason) {
      toast.error('Please select a reason');
      return;
    }
    reportMutate({
      commentId: reportingComment._id,
      reason: reportReason,
      description: reportDescription,
    });
  };

  const openReport = (comment) => {
    setReportingComment(comment);
    openReportModal();
  };

  const canDeleteComment = (comment) => {
    if (!currentUser) return false;
    return isAdmin || comment.createdBy?._id === currentUser._id;
  };

  const displayedFavUsers = showAllFavUsers ? favUsers : favUsers?.slice(0, 5);

  return (
    <>
      <AspectRatio ratio={1}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <OptimizedImage
            src={blog.blogPicUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
          />
        </div>
      </AspectRatio>
      <Space h="xs" />
      <FavoriteButton blogId={blog._id} size={22} />

      {favUsers && favUsers.length > 0 && (
        <>
          <Space h="xs" />
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

      <Space h="sm" />

      {isHtml ? (
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      ) : (
        plainParagraphs.map((item, i) => (
          <div key={i}>
            <Text className="!text-[14px]">{item}</Text>
            <Space h="sm" />
          </div>
        ))
      )}

      <Space h="md" />
      <Text className="!text-xl" fw={600}>
        {comments.length} Comment{comments.length !== 1 ? 's' : ''} on &quot;
        {blog.title}&quot;
      </Text>
      <Space h="md" />

      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          replies={replies}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          isAdmin={isAdmin}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          replyText={replyText}
          setReplyText={setReplyText}
          handleSubmitReply={handleSubmitReply}
          isPending={isPending}
          openReport={openReport}
          deleteCommentMutate={deleteCommentMutate}
          canDeleteComment={canDeleteComment}
        />
      ))}

      <Space h="md" />
      <Divider size="sm" />
      <Space h="md" />
      <Text fw={600} className="!text-xl">
        Leave a comment
      </Text>
      <Space h="xs" />

      {isLoggedIn ? (
        <>
          <Textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            minRows={3}
            radius="md"
          />
          <Space h="sm" />
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
          <Text component={Link} href="/login" c="cyan" span>
            logged in
          </Text>{' '}
          to post a comment.
        </Text>
      )}

      {/* Report Modal */}
      <Modal opened={reportModalOpened} onClose={closeReportModal} title="Report Comment" centered>
        <Text size="sm" mb="md">
          Why are you reporting this comment?
        </Text>
        <Select
          label="Reason"
          placeholder="Select a reason"
          data={[
            { value: 'spam', label: 'Spam' },
            { value: 'harassment', label: 'Harassment or bullying' },
            { value: 'inappropriate', label: 'Inappropriate content' },
            { value: 'misinformation', label: 'Misinformation' },
            { value: 'other', label: 'Other' },
          ]}
          value={reportReason}
          onChange={setReportReason}
          mb="md"
        />
        <Textarea
          label="Additional details (optional)"
          placeholder="Provide more context..."
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          minRows={2}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="subtle" onClick={closeReportModal}>
            Cancel
          </Button>
          <Button variant="filled" color="red" onClick={handleReport} loading={isReporting}>
            Submit Report
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default BlogDetails;
