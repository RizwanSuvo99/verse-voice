'use client';
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
import LatestRole from './LatestRole';

const About = () => {
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
          className="!bg-[#0ea5ea] !p-[30px]  md:!p-[40px]  !text-[#fff]"
        >
          <AspectRatio ratio={1}>
            <Image
              alt="logo-img"
              src="/assets/admin.png"
              fit="contain"
              fallbackSrc="https://placehold.co/70x70?text=admin-img"
              shadow="xl"
              className='!h-[260px] sm:!h-[300px]'
            />
          </AspectRatio>
          <Center>
            <Text className="!text-center !text-[28px] md:!text-[40px]" fw={600}>Fakharuddin Pentu</Text>
          </Center>
          <Center my={'0 1.5rem'}>
            <Text>fakharuddinpintu@gmail.com</Text>
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
              <Space h={'sm'}></Space>

              <Text>
                Hi, I’m Rizwan Suvo, a passionate Computer Science student from
                Bangladesh, currently diving deep into Full Stack Web
                Development.
              </Text>
              <Space h={'sm'}></Space>
              <Text>
                With a solid foundation in front-end technologies like HTML,
                CSS, Vanilla JavaScript, and React, I’m building dynamic,
                responsive websites and continuously learning new skills.
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
              <LatestRole
                text_1={'Current Lecturer'}
                text_2={'Cumilla Govt. College'}
              />
              <LatestRole
                text_1={'Former Lecturer'}
                text_2={'Chauddagram Govt. College, Cumilla'}
              />
              <LatestRole
                text_1={'Former Assistant Director'}
                text_2={'Anti-Corruption Commission - Bangladesh'}
              />
              <Space h={'sm'}></Space>
              <Text fw={600} className="!text-md">
                Connect Me
              </Text>
              <Space h={'5px'}></Space>
              <Group>
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
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default About;
