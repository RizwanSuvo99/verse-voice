// components/ScrollToTopButton.jsx

import { Button } from '@mantine/core'; // or your preferred UI library
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
    <Button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '50px',
        right: '40px',
        display: visible ? 'block' : 'none',
        borderWidth: '3px',
        borderRadius: '10px',
        fontSize: '16px',
      }}
      variant="outline" // You can customize the variant and styles as needed
      className="!h-[50px] !w-[70px]"
    >
      Top
    </Button>
  );
};

export default ScrollToTopButton;
