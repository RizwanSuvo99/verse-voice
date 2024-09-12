'use client';

import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import {
  IconArrowRight,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
  IconUser,
} from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="mt-14">
      <Container size={1350} className="!mt-[100px] !px-0 !py-4">
        <Paper className="px-32 py-20" radius="lg" withBorder>
          <Grid gutter={'xl'} grow>
            <Grid.Col span={4}>
              <MantineLogo size={28} />
              <Space h={'lg'} />
              <Text>
                When an unknown prnoto sans took a galley and scrambled it to
                make specimen book not only five When an unknown prnoto sans
                took a galley and scrambled it to five centurie.
              </Text>
              <Title order={5} className="!mt-3">
                Address
              </Title>
              <Stack className="!gap-0">
                <Text span>123 Main Street</Text>
                <Text span>New York, NY 10001</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Title order={4} className="!mb-8">
                Categories
              </Title>
              <Group grow>
                <Stack>
                  <Text span>Action</Text>
                  <Text span>Business</Text>
                  <Text span>Adventure</Text>
                  <Text span>Canada</Text>
                  <Text span>America</Text>
                  <Text span>Curiosity</Text>
                </Stack>
                <Stack>
                  <Text span>Animal</Text>
                  <Text span>Dental</Text>
                  <Text span>Biology</Text>
                  <Text span>Design</Text>
                  <Text span>Breakfast</Text>
                  <Text span>Dessert</Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={4}>
              <Stack>
                <Title order={4} className="!mb-8">
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
          <Group justify="space-between">
            <Text>
              © 2024 Created by{' '}
              <Text variant="gradient" span>
                Rizwan & Ekram
              </Text>
            </Text>
            <Group gap="xl">
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
