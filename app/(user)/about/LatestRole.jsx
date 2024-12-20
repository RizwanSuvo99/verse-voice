import { Flex, Text } from '@mantine/core';
import { IconBookUpload, IconBriefcase2 } from '@tabler/icons-react';

const LatestRole = ({ text_1, text_2 }) => {
  const icon1 = text_1.includes('Lecturer');
  return (
    <Flex align={'center'} gap={'sm'} mb={'10px'}>
      <div className="!flex !h-[30px] !w-[30px] !items-center !justify-center rounded-md !bg-[#fff] !p-1 !text-[#0ea5ea]">
        {icon1 ? <IconBookUpload /> : <IconBriefcase2 />}
      </div>
      <div>
        <Text fw={500} className="!text-[14px]">
          {text_1}
        </Text>
        <Text className="!text-[10px]">{text_2}</Text>
      </div>
    </Flex>
  );
};

export default LatestRole;
