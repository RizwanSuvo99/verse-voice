'use client';

import { Container, Grid, Skeleton, Stack, Flex, Card } from '@mantine/core';

const OtherBlogsSkeleton = () => {
  return (
    <Container size={1500} className="!mt-[24px]">
      <Grid gutter={2}>
        <Grid.Col span={{ base: 12, md: 8 }} className="!p-0">
          {/* RecentBlog skeleton */}
          <Stack gap="md">
            <Skeleton height={28} width={150} />
            <Skeleton height={16} width={200} mb="sm" />
            {[1, 2, 3].map((i) => (
              <Card key={i} withBorder p="md" className="glass-card-static">
                <Flex gap="md">
                  <Skeleton height={100} width={100} radius="md" />
                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={14} width="60%" />
                    <Skeleton height={12} width="40%" />
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} className="!p-0 !pt-[24px]">
          <Flex
            direction={{ base: 'column', sm: 'row', md: 'column' }}
            gap="sm"
          >
            {/* PopularBlog skeleton */}
            <Card withBorder p="md" className="glass-card-static" style={{ flex: 1 }}>
              <Skeleton height={24} width={120} mb="md" />
              {[1, 2, 3, 4].map((i) => (
                <Flex key={i} gap="sm" mb="sm">
                  <Skeleton height={60} width={60} radius="md" />
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Skeleton height={14} width="90%" />
                    <Skeleton height={10} width="50%" />
                  </Stack>
                </Flex>
              ))}
            </Card>
            {/* PopularCategories skeleton */}
            <Card withBorder p="md" className="glass-card-static" style={{ flex: 1 }}>
              <Skeleton height={24} width={140} mb="md" />
              <Flex wrap="wrap" gap="xs">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} height={32} width={80} radius="sm" />
                ))}
              </Flex>
            </Card>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default OtherBlogsSkeleton;
