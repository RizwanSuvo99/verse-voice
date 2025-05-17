'use client';

import { getCategories } from '@/services/categoriesService';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Container } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import CarouselItem from './CarouselItem';

const Categories = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get categories from the service which reads from localStorage
    const allCategories = getCategories();
    setCategories(allCategories);
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
        {categories.map((category) => (
          <Carousel.Slide key={category.id}>
            <CarouselItem
              backUrl={category.image || `/assets/category-default.jpg`}
              categoryName={category.name}
              categorySize={category.posts}
              categorySlug={category.slug}
              categoryColor={category.color}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default Categories;
