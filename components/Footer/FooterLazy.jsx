'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/hooks/useDeferredLoad';
import { Container, Paper, Skeleton, Grid, Stack, Flex, Divider } from '@mantine/core';

const Footer = dynamic(() => import('./Footer'), {
  loading: () => <FooterSkeleton />,
});

const FooterSkeleton = () => (
  <footer className="glass-footer">
    <Container size={1500} className="!mt-[32px] !py-3">
      <Paper className="px-4 py-6 md:px-8 lg:px-24 lg:py-8" radius="lg" withBorder>
        <Grid gutter="md" grow>
          <Grid.Col span={12} md={4}>
            <Skeleton height={40} width={120} mb="md" />
            <Skeleton height={60} width="100%" />
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Skeleton height={24} width={100} mb="md" />
            <Flex wrap="wrap" gap="xs">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} height={28} width={70} radius="sm" />
              ))}
            </Flex>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Stack>
              <Skeleton height={24} width={100} />
              <Skeleton height={40} width="100%" />
              <Skeleton height={44} width="100%" />
              <Skeleton height={44} width="100%" />
              <Skeleton height={36} width={120} />
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider className="!my-5" />
        <Flex justify="space-between" align="center">
          <Skeleton height={16} width={200} />
          <Flex gap="md">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
          </Flex>
        </Flex>
      </Paper>
    </Container>
  </footer>
);

const FooterLazy = () => {
  const { ref, hasLoaded } = useDeferredLoad({ rootMargin: '100px' });

  return (
    <div ref={ref}>
      {hasLoaded ? <Footer /> : <FooterSkeleton />}
    </div>
  );
};

export default FooterLazy;
