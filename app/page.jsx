import Categories from '@/components/Catergories/Categories';
import FeaturedBlog from '@/components/FeaturedBlog/FeaturedBlog';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedBlog />
    </main>
  );
}
