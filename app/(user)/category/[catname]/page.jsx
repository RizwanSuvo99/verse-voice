import allBlogs from '@/data/allBlogs';
import { Badge, Container, Flex, Space, Text, Title } from '@mantine/core';
import CategoryPageInner from './CategoryPageInner';

const Category = ({ params }) => {
  const { catname } = params;
  const categoryName = catname.charAt(0).toUpperCase() + catname.substring(1);

  const foundBlogs = allBlogs.filter((blog) => blog.category === categoryName);

  return (
    <Container size={1300} className="!pt-[50px]">
      <Flex gap={'sm'}>
        <Text
          component={Title}
          variant="gradient"
          className="!text-center !text-[40px] !leading-[60px] md:!text-[50px] lg:!text-5xl"
        >
          {categoryName}
        </Text>
        <Badge>{`${foundBlogs.length} article`}</Badge>
      </Flex>
      <Space h={'xl'} />
      {/*       <Flex align={'center'} justify={'space-between'}>
        <Text className="!mb-6 !mt-2 !text-[18px]">All the latest blogs</Text>
        <Flex gap={'sm'}>
          <IconHomeFilled color={'#0ea5ea'} />
          <Text>Home</Text>
          <IconChevronRight />
          <Text>Blogs</Text>
          <IconChevronRight />
          <Text>Design</Text>
        </Flex>
      </Flex> */}
      <CategoryPageInner foundBlogs={foundBlogs} />
    </Container>
  );
};

export default Category;

export async function generateStaticParams() {
  const categories = [
    ...new Set(allBlogs.map((item) => item.category.toLowerCase())),
  ];

  return categories.map((catname) => ({
    catname,
  }));
}
