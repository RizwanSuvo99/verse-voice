'use client';

import dynamic from 'next/dynamic';
import { useDeferredLoad } from '@/hooks/useDeferredLoad';
import OtherBlogsSkeleton from './OtherBlogsSkeleton';

const OtherBlogs = dynamic(() => import('./OtherBlogs'), {
  loading: () => <OtherBlogsSkeleton />,
});

const OtherBlogsLazy = () => {
  const { ref, hasLoaded } = useDeferredLoad({ rootMargin: '200px' });

  return (
    <div ref={ref}>
      {hasLoaded ? <OtherBlogs /> : <OtherBlogsSkeleton />}
    </div>
  );
};

export default OtherBlogsLazy;
