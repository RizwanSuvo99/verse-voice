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
    <Container size={1350} className="hero-section !px-6 !py-4 !pt-[100px]">
      <Stack
        align="center"
        justify="center"
        className="h-[350px] md:h-[450px] lg:h-[550px]"
      >
        <Center>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Text
              variant="gradient"
              component={Title}
              className="text1 !text-center !text-[70px] md:!text-[100px] lg:!text-[150px]"
            >
              {heroTitle}
            </Text>
          </motion.div>
        </Center>

        <Center>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Text
              span
              className="text1 !text-[70px] !leading-[50px] md:!text-[120px] md:!leading-[60px] lg:!text-[180px]"
            >
              &#10077;
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <Text className="!mb-4 !px-2 !text-center !text-[20px] md:!px-8 md:!text-[30px] lg:!px-12 lg:!text-[45px]">
              {heroSubtitle}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Text
              span
              className="text1 !text-[70px] !leading-[50px] md:!text-[120px] md:!leading-[60px] lg:!text-[180px]"
            >
              &#10078;
            </Text>
          </motion.div>
        </Center>
      </Stack>
    </Container>
  );
};

export default Hero;
