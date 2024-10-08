'use client';
import allBlogs from '@/data/allBlogs';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Container } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import CarouselItem from './CarouselItem';

const Categories = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const allCategories = allBlogs.reduce((acc, blog) => {
    const existingCategory = acc.find(
      (item) => item.categoryName === blog.category,
    );
    if (existingCategory) {
      existingCategory.categorySize += 1;
    } else {
      acc.push({
        categoryName: blog.category,
        categoryImg: blog.categoryImg,
        categorySize: 1,
      });
    }

    return acc;
  }, []);

  return (
    <Container size={1350} className="!px-6 py-4">
      <Carousel
        dragFree
        // Responsive settings for different screen sizes
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
