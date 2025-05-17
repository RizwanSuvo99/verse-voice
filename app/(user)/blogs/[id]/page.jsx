import BlogSingleClient from './BlogSingleClient';
import { generateStaticParams } from './staticParams';

export { generateStaticParams };

export default function BlogSingle({ params }) {
  return <BlogSingleClient params={params} />;
}
