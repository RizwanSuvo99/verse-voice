'use client';

import { getSettings } from '@/api/siteSettings.mjs';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';
import { Center, Container, Flex, Space, Text, Title } from '@mantine/core';
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
    return <FormSkeleton fields={4} />;
  }

  const cp = settings?.contactPage || {};
  const heading = cp.heading || 'Contact Us';
  const description =
    cp.description ||
    "I'd love to hear from you! Whether you have questions, feedback, or want to share your own writing journey, reach out to me.";
  const phone1 = cp.phone1 || '+8801675697313';
  const phone2 = cp.phone2 || '+8801912033727';
  const email1 = cp.email1 || 'pintu.eng@gmail.com';
  const email2 = cp.email2 || 'classroomwriters@gmail.com';
  const address1 = cp.address1 || 'Police Line, Adarsha Sadar';
  const address2 = cp.address2 || 'Cumilla 3500';
  const mapEmbedUrl = cp.mapEmbedUrl || '';
  const formHeading = cp.formHeading || 'Drop Us a Message';
  const formDescription =
    cp.formDescription ||
    'Your email address will not be published. All the fields are required.';

  return (
    <Container size={1500} className="!py-4">
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[12px] !mt-[24px] text-center !text-[24px] md:!text-[32px]"
        >
          {heading}
        </Text>
      </Center>
      <Center>
        <Text
          c="dimmed"
          className="!max-w-[780px] !text-center !text-[13px] md:!text-[14px]"
        >
          {description}
        </Text>
      </Center>
      <Space h={'md'} />
      <Center>
        <Flex
          justify={'center'}
          className="flex-wrap !gap-3 md:!gap-6"
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
      <Space h={'32px'} />
      <Map embedUrl={mapEmbedUrl} />
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[8px] !mt-[24px] text-center !text-[22px] md:!text-[28px]"
        >
          {formHeading}
        </Text>
      </Center>
      <Center>
        <Text
          c="dimmed"
          className="!max-w-[780px] !text-center !text-[13px] md:!text-[14px]"
        >
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
