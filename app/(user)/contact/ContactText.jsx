import { Group, Image, Text } from '@mantine/core';
import NextImage from 'next/image';

const ContactText = ({ imgUrl, text_1, text_2 }) => {
  return (
    <Group className="!gap-2.5">
      <Image
        src={imgUrl}
        fit="contain"
        fallbackSrc="https://placehold.co/35x35?text=icon-img"
        component={NextImage}
        width={35}
        height={35}
        alt="contact-img"
      ></Image>
      <Group className="!flex-col !items-start !gap-0 !text-[#94A9C9]">
        <Text className="!text-[14px]">{text_1}</Text>
        <Text className="!text-[14px]">{text_2}</Text>
      </Group>
    </Group>
  );
};

export default ContactText;