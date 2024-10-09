'use client';

import allBlogs from '@/data/allBlogs';
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
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '../Header/Logo';

const Footer = () => {
  const categories = [...new Set(allBlogs.map((item) => item.category))];

  // Define animation variants with stronger upward motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 }, // Changed y value to 50 for a more dramatic effect
    visible: { opacity: 1, y: 0 },
  };

  // State to track if the footer is in view
  const [isVisible, setIsVisible] = useState(false);

  // Function to check if the footer is in the viewport
  const handleScroll = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the footer is fully in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer">
      <Container size={1150} className="!mt-[100px] !px-6 !py-4">
        <Paper
          className="px-6 py-10 md:px-12 lg:px-36 lg:py-20"
          radius="lg"
          withBorder
        >
          <Grid gutter={'xl'} grow>
            {/* First column with logo and address */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1 }} // Duration for slower animation
              >
                <Logo />
                <Space h={'lg'} />
                <Text className="!text-md sm:!text-xl">
                  In Bangladesh, students often memorize answers for exams
                  without really engaging with writing as a craft. Sadly, they
                  lack the motivation or platforms to express themselves freely
                  in writing. That’s where this site comes in! We’re offering a
                  space where you can write about anything—no topic is
                  off-limits. Whether you’re interested in fiction, social
                  issues, or personal experiences, you can explore your voice
                  and ideas with full freedom.
                </Text>
                <Space h={'lg'} />
                <Text className="!text-md sm:!text-xl">
                  Writing is more than just a subject for exams; it’s a life
                  skill. It helps you think critically, express your thoughts
                  clearly, and solve problems creatively. Plus, the more you
                  practice, the better your results will be—without memorizing
                  answers! Writing here will help you improve not just for your
                  exams, but for life.
                </Text>
              </motion.div>
            </Grid.Col>

            {/* Second column with categories */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.2 }} // Increased duration
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

            {/* Third column with newsletter subscription */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.4 }} // Increased duration
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
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <TextInput
                    leftSection={<IconMail stroke={2} />}
                    variant="unstyled"
                    placeholder="Your Email"
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <div>
                    <Button
                      variant="gradient"
                      rightSection={<IconArrowRight stroke={2} size={18} />}
                    >
                      Subscribe
                    </Button>
                  </div>
                </Stack>
              </motion.div>
            </Grid.Col>
          </Grid>

          <Divider className="!my-10" />

          {/* Footer Bottom Section */}
          <Group className="flex-col md:flex-row" justify="space-between">
            <Text className="text-center md:text-left">
              © 2024 Created by{' '}
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
            <Group gap="sm" className="flex-col md:flex-row">
              <Group gap={'sm'}>
                <IconBrandTwitter stroke={2} />
                <Text>Twitter</Text>
              </Group>
              <Group gap={'sm'}>
                <IconBrandLinkedin stroke={2} />
                <Text>LinkedIn</Text>
              </Group>
              <Group gap={'sm'}>
                <IconBrandInstagram stroke={2} />
                <Text>Instagram</Text>
              </Group>
            </Group>
          </Group>
        </Paper>
      </Container>
    </footer>
  );
};

export default Footer;
