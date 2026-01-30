'use client';
import { getSettings } from '@/api/siteSettings.mjs';
import { getBlogs } from '@/api/blogs.mjs';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Container, Loader, Center } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import CarouselItem from './CarouselItem';

const Categories = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: getSettings,
  });

  const { data: blogsData } = useQuery({
    queryKey: ['allBlogsForCategories'],
    queryFn: () => getBlogs({ limit: 100 }),
  });

  // Build categories from settings or derive from blogs
  const allCategories = (() => {
    if (settings?.categories?.length > 0) {
      // Count blogs per category
      const blogCounts = {};
      blogsData?.blogs?.forEach((blog) => {
        blogCounts[blog.category] = (blogCounts[blog.category] || 0) + 1;
      });

      return settings.categories.map((cat) => ({
        categoryName: cat.name,
        categoryImg: cat.image,
        categorySize: blogCounts[cat.name] || 0,
      }));
    }

    if (!blogsData?.blogs) return [];

    return blogsData.blogs.reduce((acc, blog) => {
      const existing = acc.find((item) => item.categoryName === blog.category);
      if (existing) {
        existing.categorySize += 1;
      } else {
        acc.push({
          categoryName: blog.category,
          categoryImg: blog.blogPicUrl,
          categorySize: 1,
        });
      }
      return acc;
    }, []);
  })();

  if (allCategories.length === 0) {
    return (
      <Container size={1350} className="!px-6 py-4">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container size={1350} className="!px-6 py-4">
      <Carousel
        dragFree
        slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%' }}
        slideGap={{ base: 'xs', sm: 'md', md: 'lg' }}
        loop
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        controlSize={40}
      >
        {allCategories.map((category) => (
          <Carousel.Slide key={category.categoryName}>
            <CarouselItem
              backUrl={category.categoryImg}
              categoryName={category.categoryName}
              categorySize={category.categorySize}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default Categories;
