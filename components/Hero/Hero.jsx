import { Center, Container, Stack, Text, Title } from '@mantine/core';
// import Subscribe from './Subscribe';

const Hero = () => {
  return (
    <Container size={1350} className="!px-0 !py-4 !pt-[100px]">
      <Stack align="center" justify="center" h={600}>
        <Center>
          <Text
            variant="gradient"
            component={Title}
            className="text1 !text-[150px]"
          >
            Thoughts Meet Words
          </Text>
        </Center>
        <Center>
          <Text span className="text1 !text-[180px] !leading-[60px]">
            ❝
          </Text>
          <Text className="text-center !text-[45px]">
            Discover articles that spark new thoughts, guide you through
            challenges, and inspire your next move.
          </Text>
          <Text span className="text1 !text-[180px] !leading-[60px]">
            ❞
          </Text>
        </Center>
        {/* <Subscribe /> */}
      </Stack>
    </Container>
  );
};

export default Hero;
