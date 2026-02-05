'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import {
  ActionIcon,
  AspectRatio,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Space,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import LatestRole from './LatestRole';

const DEFAULT_ABOUT_TEXT =
  "Hey there! I've always imagined how great it would be to have a writing website just for students, and now it's finally a reality!\n\nThis space is all about breaking free from those stiff, boring syllabi. It's your chance to unleash your creativity and let your imagination soar\u2014no idea is too wild! Let's dive into this adventure together!";

const DEFAULT_ROLES = [
  { title: 'Current Lecturer', organization: 'Comilla Govt. College, Comilla' },
  {
    title: 'Former Lecturer',
    organization: 'Chauddagram Govt. College, Comilla',
  },
  {
    title: 'Former Assistant Director',
    organization: 'Anti-Corruption Commission - Bangladesh',
  },
];

const About = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  if (isLoading) {
    return <FormSkeleton fields={6} />;
  }

  const about = settings?.aboutPage || {};
  const aboutName = about.name || 'Fakharuddin Pentu';
  const aboutEmail = about.email || 'pintu.eng@gmail.com';
  const aboutImage = about.imageUrl || '/assets/admin.png';
  const aboutText = about.aboutText || DEFAULT_ABOUT_TEXT;
  const roles =
    about.roles && about.roles.length > 0 ? about.roles : DEFAULT_ROLES;
  const social = about.socialLinks || {};

  const aboutParagraphs = aboutText.split('\n').filter((p) => p.trim());

  const hasSocialLinks =
    social.linkedin || social.twitter || social.facebook || social.email;

  return (
    <Container size={1500} className="pt-[24px]">
      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing="md"
        className="!mx-auto !w-[80%]"
      >
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="!p-[24px] md:!p-[32px]"
        >
          <AspectRatio ratio={1}>
            <Image
              alt="logo-img"
              src={aboutImage}
              fit="contain"
              fallbackSrc="https://placehold.co/70x70?text=admin-img"
              shadow="xl"
              className="!h-[220px] sm:!h-[260px]"
            />
          </AspectRatio>
          <Center>
            <Text
              className="!text-center !text-[22px] md:!text-[28px]"
              fw={600}
            >
              {aboutName}
            </Text>
          </Center>
          <Center my={'0 1rem'}>
            <Text c="dimmed" size="sm">
              {aboutEmail}
            </Text>
          </Center>
          <Center>
            <Button variant="gradient" size="sm">
              Download CV
            </Button>
          </Center>
        </Card>

        <Grid gutter="md">
          <Grid.Col>
            <Card radius="md" shadow="sm" padding="lg" withBorder>
              <Text component={Title} order={3}>
                About Me
              </Text>
              <Space h={'xs'} />
              {aboutParagraphs.map((paragraph, index) => (
                <div key={index}>
                  <Text size="sm">{paragraph}</Text>
                  {index < aboutParagraphs.length - 1 && <Space h={'xs'} />}
                </div>
              ))}
            </Card>
          </Grid.Col>
          <Grid.Col>
            <Card radius="md" shadow="sm" padding="lg" withBorder>
              <Text fw={600} className="!text-lg">
                Latest Roles
              </Text>
              <Space h={'xs'} />
              {roles.map((role, index) => (
                <LatestRole
                  key={index}
                  text_1={role.title}
                  text_2={role.organization}
                />
              ))}
              <Space h={'xs'} />
              <Text fw={600} size="sm">
                Connect Me
              </Text>
              <Space h={'4px'} />
              <Group>
                {hasSocialLinks ? (
                  <>
                    {social.linkedin && (
                      <ActionIcon
                        variant="subtle"
                        component="a"
                        href={social.linkedin}
                        target="_blank"
                        size="lg"
                      >
                        <IconBrandLinkedin size={18} />
                      </ActionIcon>
                    )}
                    {social.twitter && (
                      <ActionIcon
                        variant="subtle"
                        component="a"
                        href={social.twitter}
                        target="_blank"
                        size="lg"
                      >
                        <IconBrandX size={18} />
                      </ActionIcon>
                    )}
                    {social.facebook && (
                      <ActionIcon
                        variant="subtle"
                        component="a"
                        href={social.facebook}
                        target="_blank"
                        size="lg"
                      >
                        <IconBrandFacebook size={18} />
                      </ActionIcon>
                    )}
                    {social.email && (
                      <ActionIcon
                        variant="subtle"
                        component="a"
                        href={`mailto:${social.email}`}
                        size="lg"
                      >
                        <IconMail size={18} />
                      </ActionIcon>
                    )}
                  </>
                ) : (
                  <>
                    <ActionIcon variant="subtle" size="lg">
                      <IconBrandLinkedin size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg">
                      <IconBrandX size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg">
                      <IconBrandFacebook size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" size="lg">
                      <IconMail size={18} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default About;
