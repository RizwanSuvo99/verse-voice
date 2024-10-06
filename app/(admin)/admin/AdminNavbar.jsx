'use client';

import { Flex, Group, Image, Text } from '@mantine/core';
import {
  IconArticle,
  IconCategoryPlus,
  IconEdit,
  IconLogout,
  IconPencilPlus,
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from './NavbarSimpleColored.module.css';

const data = [
  { link: '', label: 'Create Blog', icon: IconPencilPlus },
  { link: '', label: 'Customize Hero', icon: IconEdit },
  { link: '', label: 'Customize Footer', icon: IconEdit },
  { link: '', label: 'Create Categories', icon: IconCategoryPlus },
  { link: '', label: 'All Blogs', icon: IconArticle },
];

const AdminNavbar = () => {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Flex>
      <div className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Image
              alt="classRoomWriters-logo"
              src="/assets/logo-white.svg"
              h={60}
            />
            <Text fw={600} c={'white'}>
              Class Room Writers
            </Text>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div></div>
    </Flex>
  );
};

export default AdminNavbar;
