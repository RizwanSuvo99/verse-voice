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
import Link from 'next/link';
import Logo from '../Header/Logo';

const Footer = () => {
  const categories = [...new Set(allBlogs.map((item) => item.category))];

  return (
    <footer>
      <Container size={1150} className="!mt-[100px] !px-6 !py-4">
        <Paper
          className="px-6 py-10 md:px-12 lg:px-36 lg:py-20"
          radius="lg"
          withBorder
        >
          <Grid gutter={'xl'} grow>
            {/* First column with logo and address */}
            <Grid.Col span={12} md={4}>
              <Logo />
              <Space h={'lg'} />
              <Text className="!text-md sm:!text-xl">
                In Bangladesh, students often memorize answers for exams without
                really engaging with writing as a craft. Sadly, they lack the
                motivation or platforms to express themselves freely in writing.
                That’s where this site comes in! We’re offering a space where
                you can write about anything—no topic is off-limits. Whether
                you’re interested in fiction, social issues, or personal
                experiences, you can explore your voice and ideas with full
                freedom.
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
            </Grid.Col>

            {/* Second column with categories */}
            <Grid.Col span={12} md={4}>
              <Title order={4} className="!mb-8">
                Categories
              </Title>
              <Flex>
                <div className="!flex !flex-wrap !gap-2">
                  {categories.map((cat) => (
                    <Button
                      className="!border-[2px] !border-[#1971c2]"
                      variant="transparent"
                    >
                      <Link
                        href={`/category/${cat.toLowerCase()}`}
                        key={cat}
                        className="!text-white !no-underline"
                      >
                        {cat}
                      </Link>
                    </Button>
                  ))}
                </div>
                {/* <Stack>
                  {categories.map(
                    (cat, i) =>
                      i <= Math.floor(categories.length / 2) && (
                        <Link
                          href={`/category/${cat.toLowerCase()}`}
                          key={cat}
                          className="!text-white"
                        >
                          {cat}
                        </Link>
                      ),
                  )}
                </Stack>
                <Stack>
                  {categories.map(
                    (cat, i) =>
                      i > Math.floor(categories.length / 2) && (
                        <Link
                          href={`/category/${cat.toLowerCase()}`}
                          key={cat}
                          className="!text-white"
                        >
                          {cat}
                        </Link>
                      ),
                  )}
                </Stack> */}
              </Flex>
            </Grid.Col>

            {/* Third column with newsletter subscription */}
            <Grid.Col span={12} md={4}>
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
            </Grid.Col>
          </Grid>

          <Divider className="!my-10" />

          {/* Footer Bottom Section */}
          <Group className="flex-col md:flex-row" justify="space-between">
            <Text className="text-center md:text-left">
              © 2024 Created by{' '}
              <Text variant="gradient" span>
                Rizwan & Ekram
              </Text>
            </Text>
            <Group gap="xl" className="flex-col md:flex-row">
              <Group gap={'xs'}>
                <IconBrandTwitter stroke={2} />
                <Text>Twitter</Text>
              </Group>
              <Group gap={'xs'}>
                <IconBrandLinkedin stroke={2} />
                <Text>LinkedIn</Text>
              </Group>
              <Group gap={'xs'}>
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
