'use client';
import { getSettings } from '@/api/siteSettings.mjs';
import { Center, Container, Stack, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const Hero = () => {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const heroTitle = settings?.heroTitle || 'Thoughts Meet Words';
  const heroSubtitle =
    settings?.heroSubtitle ||
    'Explore authentic writings from students, sharing their feelings, experiences, and imaginative stories that inspire.';

  return (
    <Container size={1500} className="hero-section !px-6 !py-4 !pt-[24px]">
      <Stack
        align="center"
        justify="center"
        className="h-[200px] md:h-[280px] lg:h-[360px]"
      >
        <Center>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Text
              variant="gradient"
              component={Title}
              className="text1 !text-center !text-[48px] md:!text-[64px] lg:!text-[80px]"
            >
              {heroTitle}
            </Text>
          </motion.div>
        </Center>

        <Center>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          >
            <Text
              c="dimmed"
              className="!mb-2 !px-2 !text-center !text-[14px] md:!px-8 md:!text-[16px] lg:!px-12 lg:!text-[18px]"
            >
              {heroSubtitle}
            </Text>
          </motion.div>
        </Center>
      </Stack>
    </Container>
  );
};

export default Hero;
