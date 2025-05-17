'use client';
import { ActionIcon, Group, Text, Title } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import Link from 'next/link';

const CarouselItem = ({ backUrl, categoryName, categorySize, categorySlug, categoryColor }) => {
  return (
    <div
      className="relative mb-4 overflow-hidden rounded-lg"
      style={{
        height: '300px',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}
    >
      <div
        className="w-full"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <Link
        href={`/category/${categorySlug}`}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <Title
          className="!mb-4 !text-white"
          style={{ color: categoryColor || 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
        >
          {categoryName}
        </Title>
        <Group>
          <ActionIcon variant="light" radius="xl" size="lg">
            <Icon123 style={{ color: categoryColor || 'white' }} />
          </ActionIcon>
          <Text className="!text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            {categorySize} {categorySize === 1 ? 'Post' : 'Posts'}
          </Text>
        </Group>
      </Link>
    </div>
  );
};

export default CarouselItem;
