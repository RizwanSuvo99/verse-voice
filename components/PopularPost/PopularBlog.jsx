import allBlogs from '@/data/allBlogs';
import { Card, Container, Divider, Grid, Text, Title } from '@mantine/core';
import PopularSingleBlog from './PopularSingleBlog';

const PopularBlog = () => {
  const popularBlogs = allBlogs.filter((item) => item.isPopular);

  return (
    <Container size={1350} className="!mt-[10px]">
      <Card shadow="sm" padding="md" radius="md" withBorder className="!h-full">
        <Text component={Title} variant="gradient" className="!text-2xl">
          Popular Blogs
        </Text>
        <Divider size="xl" mt={'5px'} mb={'1.5rem'} className="!w-[50%]" />
        <Grid grow className="!gap-8">
          {popularBlogs.map((blog, i) => (
            <Grid.Col span={12} key={i}>
              <PopularSingleBlog
                blog={blog}
                divider={i === popularBlogs.length - 1 ? false : true}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};
export default PopularBlog;
