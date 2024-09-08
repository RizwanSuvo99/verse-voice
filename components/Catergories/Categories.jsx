'use client';
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { Container } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import CarouselItem from './CarouselItem';

const Categories = () => {
  const allCategories = [
    {
      backUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/categories/cat1.png',
      catergoyName: 'Travels',
      categorySize: 4,
    },
    {
      backUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/categories/cat2.png',
      catergoyName: 'Business',
      categorySize: 8,
    },
    {
      backUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/categories/cat3.png',
      catergoyName: 'Lifestyle',
      categorySize: 7,
    },
    {
      backUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/categories/cat4.png',
      catergoyName: 'Culture',
      categorySize: 2,
    },
    {
      backUrl:
        'https://genz-nextjs-v3.vercel.app/assets/imgs/page/categories/cat5.png',
      catergoyName: 'Minimal',
      categorySize: 6,
    },
  ];
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <Container size={1350} className="!px-0 py-4">
      <Carousel
        withIndicators
        slideSize={{ base: '100%', sm: '50%', md: '25%' }}
        slideGap={{ base: 0, sm: 'md' }}
        loop
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        controlSize={40}
      >
        {allCategories.map((category) => (
          <Carousel.Slide key={category.catergoyName}>
            <CarouselItem
              backUrl={category.backUrl}
              catergoyName={category.catergoyName}
              categorySize={category.categorySize}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};

export default Categories;
