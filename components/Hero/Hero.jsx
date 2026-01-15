'use client';
import { useSiteSettings } from '@/hooks/queries';
import { Center, Container, Stack, Text, Title } from '@mantine/core';

const Hero = () => {
  const { data: settings } = useSiteSettings();

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
          <div className="animate-fade-in-up">
            <Text
              variant="gradient"
              component={Title}
              className="text1 !text-center !text-[48px] md:!text-[64px] lg:!text-[80px]"
            >
              {heroTitle}
            </Text>
          </div>
        </Center>

        <Center>
          <div className="animate-fade-in-scale">
            <Text
              c="dimmed"
              className="!mb-2 !px-2 !text-center !text-[14px] md:!px-8 md:!text-[16px] lg:!px-12 lg:!text-[18px]"
            >
              {heroSubtitle}
            </Text>
          </div>
        </Center>
      </Stack>
    </Container>
  );
};

export default Hero;
