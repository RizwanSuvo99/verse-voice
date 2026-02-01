'use client';
import { getSettings } from '@/api/siteSettings.mjs';
import { getBlogs } from '@/api/blogs.mjs';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import CategorySkeleton from '@/components/Skeletons/CategorySkeleton';
import { Container } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useMemo } from 'react';
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

  const allCategories = useMemo(() => {
    if (settings?.categories?.length > 0) {
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
  }, [settings?.categories, blogsData?.blogs]);

  if (allCategories.length === 0) {
    return (
      <Container size={1500} className="!px-6 py-4">
        <CategorySkeleton count={6} />
      </Container>
    );
  }

  return (
    <Container size={1500} className="!px-6 py-4">
      <Carousel
        dragFree
        slideSize={{ base: '100%', sm: '50%', md: '33.333%', lg: '25%' }}
        slideGap={{ base: 'xs', sm: 'sm', md: 'md' }}
        loop
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        controlSize={36}
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
