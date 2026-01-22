import Categories from '@/components/Catergories/Categories';
import FeaturedBlog from '@/components/FeaturedBlog/FeaturedBlog';
import Hero from '@/components/Hero/Hero';
import OtherBlogsLazy from '@/components/OtherBlog/OtherBlogsLazy';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedBlog />
      <OtherBlogsLazy />
    </main>
  );
}
