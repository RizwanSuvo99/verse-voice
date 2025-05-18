'use client';
import { getSettings } from '@/services/settingsService';
import { Center, Container, Flex, Space, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactText from './ContactText';
import Map from './Map';

const Contact = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const siteSettings = getSettings();
    setSettings(siteSettings);
  }, []);

  return (
    <Container size={1350} className="!px-6 !py-4">
      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[30px] !mt-[50px] text-center !text-[45px] md:!text-[65px]"
        >
          {settings.contactTitle || 'Contact Us'}
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          {settings.contactDescription || 
            "I'd love to hear from you! Whether you have questions, feedback, or want to share your own writing journey, reach out to me. Your thoughts are important, and together we can inspire creativity and connection. Let's build a vibrant community of young writers!"}
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
            text_1={settings.contactPhone || '+8801675697313'}
            text_2={settings.contactPhone2 || '+8801912033727'}
          />
          <ContactText
            imgUrl="/assets/location.svg"
            text_1={settings.contactEmail || 'pintu.eng@gmail.com'}
            text_2={settings.contactEmail2 || 'classroomwriters@gmail.com'}
          />
          <ContactText
            imgUrl="/assets/paper-plane.svg"
            text_1={settings.contactAddress ? settings.contactAddress.split(',')[0] : 'Police Line, Adarsha Sadar'}
            text_2={settings.contactAddress ? settings.contactAddress.split(',')[1] : 'Cumilla 3500'}
          />
        </Flex>
      </Center>
      <Space h={'80px'} />
      <Map mapUrl={settings.contactMapUrl} />

      <Center>
        <Text
          component={Title}
          variant="gradient"
          className="!mb-[10px] !mt-[50px] text-center !text-[30px] md:!text-[45px]"
        >
          {settings.contactFormTitle || 'Drop Us a Message'}
        </Text>
      </Center>
      <Center>
        <Text className="!max-w-[780px] !text-center !text-[16px] !text-[#94A9C9] md:!text-[20px]">
          {settings.contactFormDescription || 'Your email address will not be published. All the fields are required.'}
        </Text>
      </Center>
      <Center>
        <ContactForm contactEmail={settings.contactEmail} />
      </Center>
    </Container>
  );
};

export default Contact;
