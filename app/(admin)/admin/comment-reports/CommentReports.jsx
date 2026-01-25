'use client';

import {
  getAllReports,
  updateReportStatus,
  deleteReport,
  deleteReportedComment,
} from '@/api/comments.mjs';
import BlogGridSkeleton from '@/components/Skeletons/BlogGridSkeleton';
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';

const statusColors = { pending: 'yellow', reviewed: 'green', dismissed: 'gray' };
const reasonLabels = {
  spam: 'Spam',
  harassment: 'Harassment',
  inappropriate: 'Inappropriate',
  misinformation: 'Misinformation',
  other: 'Other',
};

const CommentReports = () => {
  const queryClient = useQueryClient();

  const { data: reports, isLoading } = useQuery({
    queryKey: ['commentReports'],
    queryFn: getAllReports,
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateReportStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
      toast.success('Report status updated');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  const { mutate: deleteReportMutate } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
      toast.success('Report dismissed');
    },
    onError: () => {
      toast.error('Failed to delete report');
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: deleteReportedComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReports'] });
      toast.success('Comment and reports deleted');
    },
    onError: () => {
      toast.error('Failed to delete comment');
    },
  });

  if (isLoading) {
    return <BlogGridSkeleton count={4} cols={{ base: 1, md: 2 }} />;
  }

  return (
    <div>
      <Text component={Title} variant="gradient" className="!mb-4 !text-lg">
        Comment Reports
      </Text>

      {!reports || reports.length === 0 ? (
        <Text c="dimmed">No comment reports</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          {reports.map((report) => (
            <Card key={report._id} withBorder padding="lg" radius="md">
              <Group justify="space-between" mb="sm">
                <Badge color={statusColors[report.status]} variant="filled">
                  {report.status}
                </Badge>
                <Text fz="xs" c="dimmed">
                  {dayjs(report.createdAt).format('D MMM YYYY HH:mm')}
                </Text>
              </Group>

              <Badge color="red" variant="light" mb="xs">
                {reasonLabels[report.reason] || report.reason}
              </Badge>

              {report.description && (
                <Text fz="sm" c="dimmed" mb="xs">
                  Description: {report.description}
                </Text>
              )}

              <Text fz="sm" mb="xs">
                <strong>Reported by:</strong> {report.reportedBy?.name} ({report.reportedBy?.email})
              </Text>

              {report.comment ? (
                <>
                  <Text fz="sm" mb="xs">
                    <strong>Comment author:</strong> {report.comment.createdBy?.name} ({report.comment.createdBy?.email})
                  </Text>

                  <Card withBorder p="sm" mb="sm" className="glass-card">
                    <Text fz="sm" style={{ wordBreak: 'break-word' }}>
                      {report.comment.text}
                    </Text>
                  </Card>

                  {report.comment.blog && (
                    <Text fz="xs" c="dimmed" mb="sm">
                      On blog:{' '}
                      <Text
                        component={Link}
                        href={`/blogs/${report.comment.blog._id}`}
                        c="cyan"
                        span
                        target="_blank"
                      >
                        {report.comment.blog.title}
                      </Text>
                    </Text>
                  )}
                </>
              ) : (
                <Text fz="sm" c="dimmed" mb="sm" fs="italic">
                  Comment has been deleted
                </Text>
              )}

              {report.status === 'pending' && report.comment && (
                <Group mt="md" gap="xs">
                  <Button
                    size="xs"
                    color="green"
                    onClick={() => updateStatus({ id: report._id, status: 'reviewed' })}
                  >
                    Mark Reviewed
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => {
                      if (confirm('Delete this comment? This will remove the comment and all its reports.')) {
                        deleteCommentMutate(report._id);
                      }
                    }}
                  >
                    Delete Comment
                  </Button>
                  <Button
                    size="xs"
                    color="gray"
                    variant="outline"
                    onClick={() => deleteReportMutate(report._id)}
                  >
                    Dismiss Report
                  </Button>
                </Group>
              )}

              {report.status !== 'pending' && (
                <Button
                  size="xs"
                  color="gray"
                  variant="outline"
                  mt="md"
                  onClick={() => deleteReportMutate(report._id)}
                >
                  Remove Report
                </Button>
              )}
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default CommentReports;
