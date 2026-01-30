'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import { subscribe } from '@/api/newsletter.mjs';
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconArrowRight,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import Logo from '../Header/Logo';

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const categories = settings?.categories?.map((c) => c.name) || [];
  const footerText = settings?.footerText || '';

  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const { mutate: subscribeMutate, isPending } = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      notifications.show({ title: 'Subscribed successfully!', color: 'green' });
      setNewsletterName('');
      setNewsletterEmail('');
    },
    onError: (err) => {
      notifications.show({
        title: err?.response?.data?.message || 'Subscription failed',
        color: 'red',
      });
    },
  });

  const handleSubscribe = () => {
    if (!newsletterName || !newsletterEmail) {
      notifications.show({ title: 'Please fill in all fields', color: 'red' });
      return;
    }
    subscribeMutate({ name: newsletterName, email: newsletterEmail });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer" className="glass-footer">
      <Container size={1150} className="!mt-[100px] !px-6 !py-4">
        <Paper
          className="glass-card px-6 py-10 md:px-12 lg:px-36 lg:py-20"
          radius="lg"
          withBorder
        >
          <Grid gutter={'xl'} grow>
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1 }}
              >
                <Logo />
                <Space h={'lg'} />
                <Text className="!text-md sm:!text-xl">{footerText}</Text>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Title order={4} className="!mb-8">
                  Categories
                </Title>
                <Flex>
                  <div className="!flex !flex-wrap !gap-2">
                    {categories.map((cat) => (
                      <Button
                        className="!border-[2px] !border-[#1971c2]"
                        variant="transparent"
                        key={cat}
                      >
                        <Link
                          href={`/category/${cat.toLowerCase()}`}
                          className="!text-[#1971c2] !no-underline"
                        >
                          {cat}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </Flex>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <Stack>
                  <Title order={4} className="!mb-2">
                    Newsletter
                  </Title>
                  <Text>
                    Sign up to be first to receive the latest stories inspiring
                    us, case studies, and industry news.
                  </Text>
                  <TextInput
                    leftSection={<IconUser stroke={2} />}
                    variant="unstyled"
                    placeholder="Your Name"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <TextInput
                    leftSection={<IconMail stroke={2} />}
                    variant="unstyled"
                    placeholder="Your Email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <div>
                    <Button
                      variant="gradient"
                      rightSection={<IconArrowRight stroke={2} size={18} />}
                      onClick={handleSubscribe}
                      loading={isPending}
                    >
                      Subscribe
                    </Button>
                  </div>
                </Stack>
              </motion.div>
            </Grid.Col>
          </Grid>

          <Divider className="!my-10" />

          <Group className="flex-col md:flex-row" justify="space-between">
            <Text className="text-center md:text-left">
              &copy; 2024 Created by{' '}
              <Text
                component={Link}
                variant="gradient"
                href="https://www.facebook.com/rizwansuvo1"
                className="!text-[20px] !font-bold"
              >
                {' '}
                Rizwan
              </Text>{' '}
              & &nbsp;
              <Text
                component={Link}
                variant="gradient"
                href="https://www.facebook.com/ekramullah70"
                className="!text-[20px] !font-bold"
              >
                Ekram
              </Text>
            </Text>
            <Group gap="md" className="flex-col md:flex-row">
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="!no-underline">
                  <Group gap="xs">
                    <IconBrandTwitter stroke={2} />
                    <Text>Twitter</Text>
                  </Group>
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="!no-underline">
                  <Group gap="xs">
                    <IconBrandLinkedin stroke={2} />
                    <Text>LinkedIn</Text>
                  </Group>
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="!no-underline">
                  <Group gap="xs">
                    <IconBrandInstagram stroke={2} />
                    <Text>Instagram</Text>
                  </Group>
                </a>
              )}
            </Group>
          </Group>
        </Paper>
      </Container>
    </footer>
  );
};

export default Footer;
