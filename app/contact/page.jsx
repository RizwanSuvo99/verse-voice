import { Center, Container, Group, Space, Text, Title } from '@mantine/core';
import ContactForm from './ContactForm';
import ContactText from './ContactText';
import Map from './Map';

const Contact = () => {
  return (
    <Container size={1350} className="!px-0 !py-4">
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[40px] !mt-[50px] !text-[65px]"
        >
          Contact Us
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[20px] !text-[#94A9C9]">
          We are Jthemes, a creative and dedicated group of individuals who love
          web development almost as much as we love our customers. We are a
          passionate team with the mission of achieving perfection in web
          design. All designs are made by love with pixel-perfect designand
          excellent coding quality.
        </Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Group className="!gap-8">
          <ContactText
            imgUrl="/assets/headset.svg"
            text_1={'01521408552'}
            text_2={'01775137111'}
          />
          <ContactText
            imgUrl="/assets/location.svg"
            text_1={'contact@genz.com'}
            text_2={'user@genz.com'}
          />
          <ContactText
            imgUrl="/assets/paper-plane.svg"
            text_1={'11567 E Broadview Dr'}
            text_2={'Colorado(CO), 80117'}
          />
        </Group>
      </Center>
      <Space h={'80px'} />
      <Map />

      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[10px] !mt-[50px] !text-[45px]"
        >
          Drop Us a Message
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[20px] !text-[#94A9C9]">
          Your email address will not be published. All the fields are required
        </Text>
      </Center>
      <Center>
        <ContactForm />
      </Center>
    </Container>
  );
};

export default Contact;
