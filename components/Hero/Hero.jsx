import { Center, Container, Stack, Text, Title } from '@mantine/core';
// import Subscribe from './Subscribe';

const Hero = () => {
  return (
    <Container size={1350} className="!px-6 !py-4 !pt-[100px]">
      <Stack
        align="center"
        justify="center"
        className="h-[350px] md:h-[450px] lg:h-[550px]" // Responsive height
      >
        <Center>
          <Text
            variant="gradient"
            component={Title}
            className="text1 !text-center !text-[60px] md:!text-[100px] lg:!text-[150px]"
          >
            Thoughts Meet Words
          </Text>
        </Center>
        <Center>
          {/* Left quote mark */}
          <Text
            span
            className="text1 !text-[80px] !leading-[50px] md:!text-[120px] md:!leading-[60px] lg:!text-[180px]"
          >
            ❝
          </Text>
          {/* Main text */}
          <Text className="!px-2 !text-center !text-[20px] md:!px-8 md:!text-[30px] lg:!px-12 lg:!text-[45px]">
            Discover articles that spark new thoughts, guide you through
            challenges, and inspire your next move.
          </Text>
          {/* Right quote mark */}
          <Text
            span
            className="text1 !text-[80px] !leading-[50px] md:!text-[120px] md:!leading-[60px] lg:!text-[180px]"
          >
            ❞
          </Text>
        </Center>
        {/* <Subscribe /> */}
      </Stack>
    </Container>
  );
};

export default Hero;
