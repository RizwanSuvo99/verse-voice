'use client';
import { getImageFromLocalStorage, getSettings } from '@/services/settingsService';
import {
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
import { useEffect, useState } from 'react';
import LatestRole from './LatestRole';

const About = () => {
  const [aboutData, setAboutData] = useState({
    name: 'Fakharuddin Pentu',
    email: 'pintu.eng@gmail.com',
    description: '',
    image: '/assets/admin.png',
    cvLink: '#',
    roles: [],
    socials: {
      linkedin: '#',
      twitter: '#',
      facebook: '#',
      email: 'pintu.eng@gmail.com'
    }
  });

  useEffect(() => {
    const settings = getSettings();
    
    // Check for custom image in localStorage first
    const customImage = getImageFromLocalStorage('aboutImage');
    
    setAboutData({
      name: settings.aboutName || 'Fakharuddin Pentu',
      email: settings.aboutEmail || 'pintu.eng@gmail.com',
      description: settings.aboutDescription || '',
      image: customImage || settings.aboutImage || '/assets/admin.png',
      cvLink: settings.aboutCVLink || '#',
      roles: Array.isArray(settings.aboutRoles) && settings.aboutRoles.length > 0 
        ? settings.aboutRoles 
        : [
            { title: 'Current Lecturer', organization: 'Comilla Govt. College, Comilla' },
            { title: 'Former Lecturer', organization: 'Chauddagram Govt. College, Comilla' },
            { title: 'Former Assistant Director', organization: 'Anti-Corruption Commission - Bangladesh' }
          ],
      socials: settings.aboutSocials || {
        linkedin: '#',
        twitter: '#',
        facebook: '#',
        email: 'pintu.eng@gmail.com'
      }
    });
  }, []);

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
              src={aboutData.image}
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
              {aboutData.name}
            </Text>
          </Center>
          <Center my={'0 1.5rem'}>
            <Text>{aboutData.email}</Text>
          </Center>
          <Center>
            <Button variant="white" component="a" href={aboutData.cvLink}>
              Download CV
            </Button>
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
              <Space h={'sm'}></Space>

              <Text>
                {aboutData.description}
              </Text>
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
              <Space h={'sm'}></Space>
              
              {aboutData.roles.map((role, index) => (
                <LatestRole
                  key={index}
                  text_1={role.title}
                  text_2={role.organization}
                />
              ))}
              
              <Space h={'sm'}></Space>
              <Text fw={600} className="!text-md">
                Connect Me
              </Text>
              <Space h={'5px'}></Space>
              <Group>
                <Button
                  component="a"
                  href={aboutData.socials.linkedin && aboutData.socials.linkedin.startsWith('http') ? aboutData.socials.linkedin : `https://${aboutData.socials.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  fw={500}
                  variant="white"
                  className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                >
                  <IconBrandLinkedin />
                </Button>
                <Button
                  component="a"
                  href={aboutData.socials.twitter && aboutData.socials.twitter.startsWith('http') ? aboutData.socials.twitter : `https://${aboutData.socials.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  fw={500}
                  variant="white"
                  className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                >
                  <IconBrandX />
                </Button>
                <Button
                  component="a"
                  href={aboutData.socials.facebook && aboutData.socials.facebook.startsWith('http') ? aboutData.socials.facebook : `https://${aboutData.socials.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  fw={500}
                  variant="white"
                  className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                >
                  <IconBrandFacebook />
                </Button>
                <Button
                  component="a"
                  href={`mailto:${aboutData.socials.email}`}
                  fw={500}
                  variant="white"
                  className="!flex !h-[35px] !w-[35px] !items-center !justify-center !rounded-full"
                >
                  <IconMail />
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default About;
