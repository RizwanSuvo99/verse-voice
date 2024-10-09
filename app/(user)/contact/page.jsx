import { Center, Container, Flex, Space, Text, Title } from '@mantine/core';
import ContactForm from './ContactForm';
import ContactText from './ContactText';
import Map from './Map';

const Contact = () => {
  return (
    <Container size={1350} className="!px-6 !py-4">
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[30px] !mt-[50px] text-center !text-[45px] md:!text-[65px]"
        >
          Contact Us
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          I’d love to hear from you! Whether you have questions, feedback, or
          want to share your own writing journey, reach out to me. Your thoughts
          are important, and together we can inspire creativity and connection.
          Let’s build a vibrant community of young writers!
        </Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Flex
          justify={'center'}
          className="flex-wrap !gap-4 md:!gap-8" // Responsive gap and wrap
          position="center" // Center the group
        >
          <ContactText
            imgUrl="/assets/headset.svg"
            text_1={'+8801675697313'}
            text_2={'+8801912033727'}
          />
          <ContactText
            imgUrl="/assets/location.svg"
            text_1={'pintu.eng@gmail.com'}
            text_2={'classroomwriters@gmail.com'}
          />
          <ContactText
            imgUrl="/assets/paper-plane.svg"
            text_1={'Police Line, Adarsha Sadar'}
            text_2={'Cumilla 3500'}
          />
        </Flex>
      </Center>
      <Space h={'80px'} />
      <Map />

      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[10px] !mt-[50px] text-center !text-[30px] md:!text-[45px]"
        >
          Drop Us a Message
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          Your email address will not be published. All the fields are required.
        </Text>
      </Center>
      <Center>
        <ContactForm />
      </Center>
    </Container>
  );
};

export default Contact;
