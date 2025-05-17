import CategoryPageClient from './CategoryPageClient';
import { generateStaticParams } from './staticParams';

export { generateStaticParams };

export default function CategoryPage({ params }) {
  return <CategoryPageClient params={params} />;
}
