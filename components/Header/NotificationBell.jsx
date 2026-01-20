'use client';

import {
  getNotifications,
  getUnreadCount,
} from '@/api/notifications.mjs';
import { useMarkNotificationRead, useMarkAllNotificationsRead } from '@/hooks/mutations';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Indicator,
  Menu,
  ScrollArea,
  Text,
} from '@mantine/core';
import { IconBell, IconHeart, IconMessage } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const NotificationBell = () => {
  const router = useRouter();

  const { data: unreadData } = useQuery({
    queryKey: ['unreadCount'],
    queryFn: getUnreadCount,
    refetchInterval: 30000, // Poll every 30 seconds
  });

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  // Use optimistic mutation hooks
  const { mutate: markRead } = useMarkNotificationRead();
  const { mutate: markAllRead } = useMarkAllNotificationsRead();

  const unreadCount = unreadData?.count || 0;

  const handleNotificationClick = (notification) => {
    if (!notification.read && !notification.isRead) {
      markRead(notification._id);
    }
    if (notification.blog?._id) {
      router.push(`/blogs/${notification.blog._id}`);
    }
  };

  const getNotificationText = (notification) => {
    const name = notification.actionBy?.name || 'Someone';
    const blogTitle = notification.blog?.title || 'your blog';

    if (notification.type === 'like') {
      return (
        <>
          <Text span fw={500}>{name}</Text> liked your post{' '}
          <Text span fw={500} c="cyan">"{blogTitle.length > 30 ? blogTitle.slice(0, 30) + '...' : blogTitle}"</Text>
        </>
      );
    }
    if (notification.type === 'comment') {
      return (
        <>
          <Text span fw={500}>{name}</Text> commented on your post{' '}
          <Text span fw={500} c="cyan">"{blogTitle.length > 30 ? blogTitle.slice(0, 30) + '...' : blogTitle}"</Text>
        </>
      );
    }
    return 'New notification';
  };

  const getNotificationIcon = (type) => {
    if (type === 'like') {
      return <IconHeart size={14} color="var(--mantine-color-red-filled)" />;
    }
    if (type === 'comment') {
      return <IconMessage size={14} color="var(--mantine-color-cyan-filled)" />;
    }
    return null;
  };

  // Check if notification is read (handle both 'read' and 'isRead' field names)
  const isNotificationRead = (notification) => notification.read || notification.isRead;

  return (
    <Menu shadow="md" width={360} position="bottom-end" offset={8}>
      <Menu.Target>
        <Indicator
          color="red"
          size={16}
          label={unreadCount > 9 ? '9+' : unreadCount}
          disabled={unreadCount === 0}
          offset={4}
        >
          <ActionIcon variant="subtle" size="md">
            <IconBell size={18} />
          </ActionIcon>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown className="glass-card" p={0}>
        <Group justify="space-between" p="sm" pb="xs">
          <Text fw={600} size="sm">Notifications</Text>
          {unreadCount > 0 && (
            <Button
              variant="subtle"
              size="compact-xs"
              onClick={(e) => {
                e.stopPropagation();
                markAllRead();
              }}
            >
              Mark all read
            </Button>
          )}
        </Group>

        <ScrollArea h={notifications?.length > 0 ? 320 : 'auto'} scrollbarSize={6}>
          {!notifications || notifications.length === 0 ? (
            <Box p="md" ta="center">
              <Text c="dimmed" size="sm">No notifications yet</Text>
            </Box>
          ) : (
            notifications.slice(0, 20).map((notification) => (
              <Box
                key={notification._id}
                p="sm"
                onClick={() => handleNotificationClick(notification)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: isNotificationRead(notification) ? 'transparent' : 'var(--accent-glow)',
                  borderBottom: '1px solid var(--border-subtle)',
                  transition: 'background-color 0.2s ease',
                }}
                className="hover:bg-[var(--bg-hover)]"
              >
                <Group gap="sm" wrap="nowrap">
                  <Avatar
                    src={notification.actionBy?.avatar}
                    radius="xl"
                    size="sm"
                  >
                    {notification.actionBy?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={4} mb={2}>
                      {getNotificationIcon(notification.type)}
                      <Text size="xs" lineClamp={2}>
                        {getNotificationText(notification)}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      {dayjs(notification.createdAt).fromNow()}
                    </Text>
                  </Box>
                  {!isNotificationRead(notification) && (
                    <Badge size="xs" color="cyan" variant="filled" circle>

                    </Badge>
                  )}
                </Group>
              </Box>
            ))
          )}
        </ScrollArea>

        {notifications?.length > 0 && (
          <Box p="xs" ta="center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <Text size="xs" c="dimmed">
              Showing {Math.min(notifications.length, 20)} of {notifications.length} notifications
            </Text>
          </Box>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationBell;
