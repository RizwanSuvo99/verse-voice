'use client';

import { Container, Grid, Pagination, Space, Text, Title } from '@mantine/core';
import { chunk } from 'lodash';
import { useState } from 'react';
import RecentSingleBlog from './RecentSingleBlog';

const RecentBlog = () => {
  const recentBlogs = [
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
      description:
        'Looking to infuse your home with some Parisian charm? This blog outlines a step-by-step guide to creating a French-inspired space that exudes elegance and simplicity. From color palettes to furniture selection, the article delves into the elements that define Parisian interior design. You’ll learn how to incorporate vintage pieces, mix modern and traditional elements, and use natural light to brighten up your rooms. The blog also touches on the importance of minimalism and how the “less is more” approach can transform your living space into a chic, stylish retreat. Whether you’re redecorating a room or your entire home, this guide provides the inspiration you need.',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
      title: 'The 60 Things To Do About Building A Plan',
      category: 'Travel',
      authorName: 'Joseph',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
      publishDate: '25 April 2023',
      timeRead: '5 mins read',
      description:
        'Creating a solid plan is crucial for any project, but where do you begin? In this article, you’ll find 60 essential tips to help you develop a foolproof plan for any endeavor. Whether you’re planning a business strategy, a trip, or a personal project, these tips cover everything from goal-setting to resource management. The blog emphasizes the importance of clarity, foresight, and adaptability in the planning process. Each tip is designed to make the planning phase more manageable, ensuring that you don’t overlook any critical steps. Whether you’re a seasoned planner or new to the process, these 60 tips will provide you with a comprehensive toolkit to tackle your next project with confidence.',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img.png',
      title: 'New blog for testing pagination 1',
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
      title: 'New blog for testing pagination 1',
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
      title: 'New blog for testing pagination 1',
      category: 'Design',
      authorName: 'Steven',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author3.png',
      publishDate: '15 May 2023',
      timeRead: '8 mins read',
      description:
        'Environmental consciousness starts at home. In this blog post, the author explores ten simple and effective ways to reduce your carbon footprint without making drastic lifestyle changes. From switching to energy-efficient appliances to adopting sustainable practices like composting, this article provides actionable steps that anyone can follow. The tips are designed to fit seamlessly into your daily routine, helping you contribute to a healthier planet. Furthermore, the article discusses how making small changes in your household can lead to significant long-term environmental benefits. It’s perfect for individuals looking to make their homes more eco-friendly while saving money and resources in the process.',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img4.png',
      title: 'New blog for testing pagination 1',
      category: 'Travel',
      authorName: 'Rose',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author4.png',
      publishDate: '12 May 2023',
      timeRead: '12 mins read',
      description:
        'Looking to infuse your home with some Parisian charm? This blog outlines a step-by-step guide to creating a French-inspired space that exudes elegance and simplicity. From color palettes to furniture selection, the article delves into the elements that define Parisian interior design. You’ll learn how to incorporate vintage pieces, mix modern and traditional elements, and use natural light to brighten up your rooms. The blog also touches on the importance of minimalism and how the “less is more” approach can transform your living space into a chic, stylish retreat. Whether you’re redecorating a room or your entire home, this guide provides the inspiration you need.',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
      title: 'New blog for testing pagination 1',
      category: 'Travel',
      authorName: 'Joseph',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
      publishDate: '25 April 2023',
      timeRead: '5 mins read',
      description:
        'Creating a solid plan is crucial for any project, but where do you begin? In this article, you’ll find 60 essential tips to help you develop a foolproof plan for any endeavor. Whether you’re planning a business strategy, a trip, or a personal project, these tips cover everything from goal-setting to resource management. The blog emphasizes the importance of clarity, foresight, and adaptability in the planning process. Each tip is designed to make the planning phase more manageable, ensuring that you don’t overlook any critical steps. Whether you’re a seasoned planner or new to the process, these 60 tips will provide you with a comprehensive toolkit to tackle your next project with confidence.',
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
      description:
        'Looking to infuse your home with some Parisian charm? This blog outlines a step-by-step guide to creating a French-inspired space that exudes elegance and simplicity. From color palettes to furniture selection, the article delves into the elements that define Parisian interior design. You’ll learn how to incorporate vintage pieces, mix modern and traditional elements, and use natural light to brighten up your rooms. The blog also touches on the importance of minimalism and how the “less is more” approach can transform your living space into a chic, stylish retreat. Whether you’re redecorating a room or your entire home, this guide provides the inspiration you need.',
    },
    {
      imgUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/healthy/img5.png',
      title: 'The 60 Things To Do About Building A Plan',
      category: 'Travel',
      authorName: 'Joseph',
      authorAvatar:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/homepage1/author5.png',
      publishDate: '25 April 2023',
      timeRead: '5 mins read',
      description:
        'Creating a solid plan is crucial for any project, but where do you begin? In this article, you’ll find 60 essential tips to help you develop a foolproof plan for any endeavor. Whether you’re planning a business strategy, a trip, or a personal project, these tips cover everything from goal-setting to resource management. The blog emphasizes the importance of clarity, foresight, and adaptability in the planning process. Each tip is designed to make the planning phase more manageable, ensuring that you don’t overlook any critical steps. Whether you’re a seasoned planner or new to the process, these 60 tips will provide you with a comprehensive toolkit to tackle your next project with confidence.',
    },
  ];

  const data = chunk(recentBlogs, 5);

  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((blog, i) => (
    <Grid.Col span={12} key={i}>
      <RecentSingleBlog blog={blog} />
    </Grid.Col>
  ));

  return (
    <Container size={1350} className="">
      <Text
        component={Title}
        variant="gradient"
        className="!text-5xl !leading-[60px]"
      >
        Recent Blogs
      </Text>
      <Text className="!mb-12 !mt-4 !text-[18px]">
        Don&apos;t miss the latest trends
      </Text>
      <Grid grow gutter="xl">
        {items}
      </Grid>
      <Space h={'md'} />
      <Pagination total={data.length} value={activePage} onChange={setPage} />
    </Container>
  );
};

export default RecentBlog;
