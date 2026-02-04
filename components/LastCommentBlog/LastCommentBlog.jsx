import { Card, Container, Divider, Grid, Text, Title } from '@mantine/core';
import LastComment from './LastComment';

const LastCommentBlog = () => {
  const popularBlogs = [
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
      description:
        'In the world of business, there are certain foundational facts that can drive success. Whether you’re a startup or an established enterprise, understanding these principles can make all the difference. The blog dives deep into the various strategies that successful entrepreneurs use to scale their business efficiently. From building a solid network to leveraging modern marketing tactics, this article provides actionable insights for anyone looking to grow their business. The importance of adaptability in an ever-changing market landscape is also discussed. Moreover, it highlights the need for a customer-centric approach to ensure longevity in your business operations. Read this blog to gain a competitive edge and propel your business toward success.',
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
      description:
        'Freelancing can offer unparalleled freedom, but it also comes with its own unique set of challenges, particularly when working from home. This article outlines several tips for creating a productive home workspace that minimizes distractions and maximizes efficiency. Whether you’re just starting out or are a seasoned freelancer, these tips can help streamline your workflow. Topics covered include the importance of a structured schedule, maintaining work-life balance, and effective communication with clients. Additionally, the article offers advice on how to set boundaries to ensure uninterrupted work hours. Read on to learn how to improve your productivity and create a work environment that suits your freelance career.',
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
      description:
        'Environmental consciousness starts at home. In this blog post, the author explores ten simple and effective ways to reduce your carbon footprint without making drastic lifestyle changes. From switching to energy-efficient appliances to adopting sustainable practices like composting, this article provides actionable steps that anyone can follow. The tips are designed to fit seamlessly into your daily routine, helping you contribute to a healthier planet. Furthermore, the article discusses how making small changes in your household can lead to significant long-term environmental benefits. It’s perfect for individuals looking to make their homes more eco-friendly while saving money and resources in the process.',
    },
  ];
  return (
    <Container fluid px="xl">
      <Card shadow="sm" padding="md" radius="md" withBorder className="!h-full">
        <Text component={Title} variant="gradient" className="!text-2xl">
          Last Comments
        </Text>
        <Divider size="xl" mt={'5px'} mb={'1.5rem'} className="!w-[50%]" />
        <Grid grow className="!gap-8">
          {popularBlogs.map((blog, i) => (
            <Grid.Col span={12} key={i}>
              <LastComment
                blog={blog}
                divider={i === popularBlogs.length - 1 ? false : true}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};
export default LastCommentBlog;
