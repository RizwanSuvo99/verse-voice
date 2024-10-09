// components/ScrollToTopButton.jsx

import { ActionIcon } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <ActionIcon
      variant="filled"
      aria-label="Settings"
      onClick={scrollToTop}
      size={'xl'}
      radius={'xl'}
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '40px',
        display: visible ? 'block' : 'none',
        borderWidth: '2px',
        zIndex: '999',
      }}
    >
      <IconArrowUp />
    </ActionIcon>
  );
};

export default ScrollToTopButton;
