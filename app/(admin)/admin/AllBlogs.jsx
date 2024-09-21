import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Center,
  Group,
  rem,
  Table,
  Text,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

const allBlogs = [
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
    title: 'Facts About Business That Will Help You Success',
    category: 'Design',
    authorName: 'Roney',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author.png',
    publishDate: '28 June 2023',
    timeRead: '35 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img2.png',
    title: 'Helpful Tips for Working from Home as a Freelancer',
    category: 'Design',
    authorName: 'Harry',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author2.png',
    publishDate: '27 June 2023',
    timeRead: '7 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img3.png',
    title: '10 Easy Ways to Be Environmentally Conscious At Home',
    category: 'Design',
    authorName: 'Steven',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author3.png',
    publishDate: '15 May 2023',
    timeRead: '8 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img4.png',
    title: 'How to Give Your Space a Parisian-Inspired Makeover',
    category: 'Travel',
    authorName: 'Rose',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author4.png',
    publishDate: '12 May 2023',
    timeRead: '12 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
    title:
      'The 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan',
    category: 'Travel',
    authorName: 'Joseph',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
    publishDate: '25 April 2023',
    timeRead: '5 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
    title: 'Facts About Business That Will Help You Success',
    category: 'Design',
    authorName: 'Roney',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author.png',
    publishDate: '28 June 2023',
    timeRead: '35 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img2.png',
    title: 'Helpful Tips for Working from Home as a Freelancer',
    category: 'Design',
    authorName: 'Harry',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author2.png',
    publishDate: '27 June 2023',
    timeRead: '7 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img3.png',
    title: '10 Easy Ways to Be Environmentally Conscious At Home',
    category: 'Design',
    authorName: 'Steven',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author3.png',
    publishDate: '15 May 2023',
    timeRead: '8 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img4.png',
    title: 'How to Give Your Space a Parisian-Inspired Makeover',
    category: 'Travel',
    authorName: 'Rose',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author4.png',
    publishDate: '12 May 2023',
    timeRead: '12 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
    title:
      'The 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan',
    category: 'Travel',
    authorName: 'Joseph',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
    publishDate: '25 April 2023',
    timeRead: '5 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
    title: 'Facts About Business That Will Help You Success',
    category: 'Design',
    authorName: 'Roney',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author.png',
    publishDate: '28 June 2023',
    timeRead: '35 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img2.png',
    title: 'Helpful Tips for Working from Home as a Freelancer',
    category: 'Design',
    authorName: 'Harry',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author2.png',
    publishDate: '27 June 2023',
    timeRead: '7 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img3.png',
    title: '10 Easy Ways to Be Environmentally Conscious At Home',
    category: 'Design',
    authorName: 'Steven',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author3.png',
    publishDate: '15 May 2023',
    timeRead: '8 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img4.png',
    title: 'How to Give Your Space a Parisian-Inspired Makeover',
    category: 'Travel',
    authorName: 'Rose',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author4.png',
    publishDate: '12 May 2023',
    timeRead: '12 mins read',
  },
  {
    imgUrl:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
    title:
      'The 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan 60 Things To Do About Building A Plan',
    category: 'Travel',
    authorName: 'Joseph',
    authorAvatar:
      'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
    publishDate: '25 April 2023',
    timeRead: '5 mins read',
  },
];

const categoryColors = [
  '#FF5733', // Persimmon
  '#33FF57', // Lime Green
  '#3357FF', // Royal Blue
  '#F39C12', // Orange
  '#8E44AD', // Purple
  '#1ABC9C', // Turquoise
  '#E74C3C', // Red
  '#3498DB', // Light Blue
  '#9B59B6', // Amethyst
  '#2ECC71', // Emerald
  '#D35400', // Pumpkin
  '#F1C40F', // Sunflower
  '#C0392B', // Pomegranate
  '#2980B9', // Belize Hole
  '#E67E22', // Carrot
  '#27AE60', // Sea Green
  '#F0E68C', // Khaki
  '#DA70D6', // Orchid
];

const AllBlogs = () => {
  const rows = allBlogs?.map((item, index) => (
    <Table.Tr key={item.name} className="!text-center">
      <Table.Td>
        <Group gap="sm">
          <Avatar size={80} src={item.imgUrl} radius={'lg'} />
          <Text fz="md" fw={500} lineClamp={1} className="!max-w-[600px]">
            {item.title}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge
          color={categoryColors[index % categoryColors.length]}
          variant="light"
          className="!min-w-[100px]"
        >
          {item.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm" className="!min-w-[100px]">
          {item.authorName}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Center>
          <Avatar size={40} src={item.authorAvatar} radius={30} />
        </Center>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.publishDate}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="!text-center">Blog Details</Table.Th>
            <Table.Th className="!text-center">Category</Table.Th>
            <Table.Th className="!text-center">Author</Table.Th>
            <Table.Th className="!text-center">Author Img</Table.Th>
            <Table.Th className="!text-center">Publish Date</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default AllBlogs;
