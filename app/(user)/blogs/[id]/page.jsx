import BlogSingle from './BlogSingle';

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;

export default function Page() {
  return <BlogSingle />;
}
