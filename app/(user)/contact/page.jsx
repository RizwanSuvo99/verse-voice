'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import { Center, Container, Flex, Loader, Space, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import ContactForm from './ContactForm';
import ContactText from './ContactText';
import Map from './Map';

const Contact = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  const cp = settings?.contactPage || {};
  const heading = cp.heading || 'Contact Us';
  const description =
    cp.description ||
    "I'd love to hear from you! Whether you have questions, feedback, or want to share your own writing journey, reach out to me. Your thoughts are important, and together we can inspire creativity and connection. Let's build a vibrant community of young writers!";
  const phone1 = cp.phone1 || '+8801675697313';
  const phone2 = cp.phone2 || '+8801912033727';
  const email1 = cp.email1 || 'pintu.eng@gmail.com';
  const email2 = cp.email2 || 'classroomwriters@gmail.com';
  const address1 = cp.address1 || 'Police Line, Adarsha Sadar';
  const address2 = cp.address2 || 'Cumilla 3500';
  const mapEmbedUrl = cp.mapEmbedUrl || '';
  const formHeading = cp.formHeading || 'Drop Us a Message';
  const formDescription =
    cp.formDescription || 'Your email address will not be published. All the fields are required.';

  return (
    <Container size={1350} className="!px-6 !py-4">
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[30px] !mt-[50px] text-center !text-[45px] md:!text-[65px]"
        >
          {heading}
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          {description}
        </Text>
      </Center>
      <Space h={'xl'} />
      <Center>
        <Flex
          justify={'center'}
          className="flex-wrap !gap-4 md:!gap-8"
          position="center"
        >
          <ContactText
            imgUrl="/assets/headset.svg"
            text_1={phone1}
            text_2={phone2}
          />
          <ContactText
            imgUrl="/assets/location.svg"
            text_1={email1}
            text_2={email2}
          />
          <ContactText
            imgUrl="/assets/paper-plane.svg"
            text_1={address1}
            text_2={address2}
          />
        </Flex>
      </Center>
      <Space h={'80px'} />
      <Map embedUrl={mapEmbedUrl} />

      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[10px] !mt-[50px] text-center !text-[30px] md:!text-[45px]"
        >
          {formHeading}
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          {formDescription}
        </Text>
      </Center>
      <Center>
        <ContactForm />
      </Center>
    </Container>
  );
};

export default Contact;
