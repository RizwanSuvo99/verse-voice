import EditPostClient from './EditPostClient';
import { generateStaticParams } from './staticParams';

export { generateStaticParams };

export default function EditPostPage({ params }) {
  return <EditPostClient params={params} />;
} 