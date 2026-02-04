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
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <ActionIcon
      variant="gradient"
      className="glow-btn"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      size="lg"
      radius="xl"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: visible ? 'flex' : 'none',
        zIndex: 999,
      }}
    >
      <IconArrowUp size={18} />
    </ActionIcon>
  );
};

export default ScrollToTopButton;
