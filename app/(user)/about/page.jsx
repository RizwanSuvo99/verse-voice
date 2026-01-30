'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import {
  AspectRatio,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Loader,
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
  { title: 'Former Lecturer', organization: 'Chauddagram Govt. College, Comilla' },
  { title: 'Former Assistant Director', organization: 'Anti-Corruption Commission - Bangladesh' },
];

const About = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  if (isLoading) {
    return (
      <Center py="xl" className="pt-[100px]">
        <Loader />
      </Center>
    );
  }

  const about = settings?.aboutPage || {};
  const aboutName = about.name || 'Fakharuddin Pentu';
  const aboutEmail = about.email || 'pintu.eng@gmail.com';
  const aboutImage = about.imageUrl || '/assets/admin.png';
  const aboutText = about.aboutText || DEFAULT_ABOUT_TEXT;
  const roles = about.roles && about.roles.length > 0 ? about.roles : DEFAULT_ROLES;
  const social = about.socialLinks || {};

  const aboutParagraphs = aboutText.split('\n').filter((p) => p.trim());

  const hasSocialLinks = social.linkedin || social.twitter || social.facebook || social.email;

  return (
    <Container size={1350} className="!px-0 pt-[100px]">
      <SimpleGrid
        cols={{ base: 1, md: 2 }}
        spacing="md"
        className="!mx-auto !w-[80%]"
      >
        <Card
          shadow="sm"
          radius="md"
          className="!bg-[#0ea5ea] !p-[30px] !text-[#fff] md:!p-[40px]"
        >
          <AspectRatio ratio={1}>
            <Image
              alt="logo-img"
              src={aboutImage}
              fit="contain"
              fallbackSrc="https://placehold.co/70x70?text=admin-img"
              shadow="xl"
              className="!h-[260px] sm:!h-[300px]"
            />
          </AspectRatio>
          <Center>
            <Text
              className="!text-center !text-[28px] md:!text-[40px]"
              fw={600}
            >
              {aboutName}
            </Text>
          </Center>
          <Center my={'0 1.5rem'}>
            <Text>{aboutEmail}</Text>
          </Center>
          <Center>
            <Button variant="white">Download CV</Button>
          </Center>
        </Card>

        <Grid gutter="md">
          <Grid.Col>
            <Card
              radius="md"
              shadow="sm"
              padding="lg"
              className="!bg-[#0ea5ea] !text-[#fff]"
            >
              <Text component={Title}>About Me</Text>
              <Space h={'sm'} />
              {aboutParagraphs.map((paragraph, index) => (
                <div key={index}>
                  <Text>{paragraph}</Text>
                  {index < aboutParagraphs.length - 1 && <Space h={'sm'} />}
                </div>
              ))}
            </Card>
          </Grid.Col>
          <Grid.Col>
            <Card
              radius="md"
              shadow="sm"
              padding="lg"
              className="!bg-[#0ea5ea] !text-[#fff]"
            >
              <Text fw={600} className="!text-2xl">
                Latest Roles
              </Text>
              <Space h={'sm'} />
              {roles.map((role, index) => (
                <LatestRole
                  key={index}
                  text_1={role.title}
                  text_2={role.organization}
                />
              ))}
              <Space h={'sm'} />
              <Text fw={600} className="!text-md">
                Connect Me
              </Text>
              <Space h={'5px'} />
              <Group>
                {hasSocialLinks ? (
                  <>
                    {social.linkedin && (
                      <Button
                        fw={500}
                        variant="white"
                        component="a"
                        href={social.linkedin}
                        target="_blank"
                        className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                      >
                        <IconBrandLinkedin />
                      </Button>
                    )}
                    {social.twitter && (
                      <Button
                        fw={500}
                        variant="white"
                        component="a"
                        href={social.twitter}
                        target="_blank"
                        className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                      >
                        <IconBrandX />
                      </Button>
                    )}
                    {social.facebook && (
                      <Button
                        fw={500}
                        variant="white"
                        component="a"
                        href={social.facebook}
                        target="_blank"
                        className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                      >
                        <IconBrandFacebook />
                      </Button>
                    )}
                    {social.email && (
                      <Button
                        fw={500}
                        variant="white"
                        component="a"
                        href={`mailto:${social.email}`}
                        className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                      >
                        <IconMail />
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      fw={500}
                      variant="white"
                      className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                    >
                      <IconBrandLinkedin />
                    </Button>
                    <Button
                      fw={500}
                      variant="white"
                      className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                    >
                      <IconBrandX />
                    </Button>
                    <Button
                      fw={500}
                      variant="white"
                      className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                    >
                      <IconBrandFacebook />
                    </Button>
                    <Button
                      fw={500}
                      variant="white"
                      className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                    >
                      <IconMail />
                    </Button>
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
