'use client';

import allBlogs from '@/data/allBlogs';
import { getSetting } from '@/services/settingsService';
import {
    Button,
    Container,
    Divider,
    Flex,
    Grid,
    Group,
    Paper,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import {
    IconArrowRight,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandYoutube,
    IconMail,
    IconUser,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '../Header/Logo';

const Footer = () => {
  const categories = [...new Set(allBlogs.map((item) => item.category))];
  const [footerText1, setFooterText1] = useState('');
  const [footerText2, setFooterText2] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#',
    youtubeUrl: '',
  });

  // Define animation variants with stronger upward motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 }, // Changed y value to 50 for a more dramatic effect
    visible: { opacity: 1, y: 0 },
  };

  // State to track if the footer is in view
  const [isVisible, setIsVisible] = useState(false);

  // Function to check if the footer is in the viewport
  const handleScroll = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      const rect = footer.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if the footer is fully in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  // Add scroll event listener and load footer settings
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Load footer text from settings
    setFooterText1(getSetting('footerDescription1'));
    setFooterText2(getSetting('footerDescription2'));
    
    // Load social media links from settings
    setSocialLinks({
      facebookUrl: getSetting('facebookUrl'),
      twitterUrl: getSetting('twitterUrl'),
      instagramUrl: getSetting('instagramUrl'),
      youtubeUrl: getSetting('youtubeUrl'),
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Helper function to format URLs (ensure they have https://)
  const formatUrl = (url) => {
    if (!url || url === '#') return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <footer id="footer">
      <Container size={1150} className="!mt-[100px] !px-6 !py-4">
        <Paper
          className="px-6 py-10 md:px-12 lg:px-36 lg:py-20"
          radius="lg"
          withBorder
        >
          <Grid gutter={'xl'} grow>
            {/* First column with logo and address */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1 }} // Duration for slower animation
              >
                <Logo />
                <Space h={'lg'} />
                <Text className="!text-md sm:!text-xl">
                  {footerText1}
                </Text>
                <Space h={'lg'} />
                <Text className="!text-md sm:!text-xl">
                  {footerText2}
                </Text>
              </motion.div>
            </Grid.Col>

            {/* Second column with categories */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.2 }} // Increased duration
              >
                <Title order={4} className="!mb-8">
                  Categories
                </Title>
                <Flex>
                  <div className="!flex !flex-wrap !gap-2">
                    {categories.map((cat) => (
                      <Button
                        className="!border-[2px] !border-[#1971c2]"
                        variant="transparent"
                        key={cat}
                      >
                        <Link
                          href={`/category/${cat.toLowerCase()}`}
                          className="!text-[#1971c2] !no-underline"
                        >
                          {cat}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </Flex>
              </motion.div>
            </Grid.Col>

            {/* Third column with newsletter subscription */}
            <Grid.Col span={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                transition={{ duration: 1, delay: 0.4 }} // Increased duration
              >
                <Stack>
                  <Title order={4} className="!mb-2">
                    Newsletter
                  </Title>
                  <Text>
                    Sign up to be first to receive the latest stories inspiring
                    us, case studies, and industry news.
                  </Text>
                  <TextInput
                    leftSection={<IconUser stroke={2} />}
                    variant="unstyled"
                    placeholder="Your Name"
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <TextInput
                    leftSection={<IconMail stroke={2} />}
                    variant="unstyled"
                    placeholder="Your Email"
                    classNames={{
                      input:
                        '!border-0 !border-b-2 !border-[#94A9C9] !rounded-none',
                    }}
                  />
                  <div>
                    <Button
                      variant="gradient"
                      rightSection={<IconArrowRight stroke={2} size={18} />}
                    >
                      Subscribe
                    </Button>
                  </div>
                </Stack>
              </motion.div>
            </Grid.Col>
          </Grid>

          <Divider className="!my-10" />

          {/* Footer Bottom Section */}
          <Group className="flex-col md:flex-row" justify="space-between">
            <Text className="text-center md:text-left">
              © 2024 Created by{' '}
              <Text
                component={Link}
                variant="gradient"
                href="https://www.facebook.com/rizwansuvo1"
                className="!text-[20px] !font-bold"
              >
                {' '}
                Rizwan
              </Text>{' '}
              & &nbsp;
              <Text
                component={Link}
                variant="gradient"
                href="https://www.facebook.com/ekramullah70"
                className="!text-[20px] !font-bold"
              >
                Ekram
              </Text>
            </Text>
            <Group gap="sm" className="flex-col md:flex-row">
              {socialLinks.twitterUrl && socialLinks.twitterUrl !== '#' && (
                <Group gap={'sm'} component={Link} href={formatUrl(socialLinks.twitterUrl)} target="_blank" className="!no-underline">
                  <IconBrandTwitter stroke={2} />
                  <Text>Twitter</Text>
                </Group>
              )}
              {socialLinks.facebookUrl && socialLinks.facebookUrl !== '#' && (
                <Group gap={'sm'} component={Link} href={formatUrl(socialLinks.facebookUrl)} target="_blank" className="!no-underline">
                  <IconBrandFacebook stroke={2} />
                  <Text>Facebook</Text>
                </Group>
              )}
              {socialLinks.instagramUrl && socialLinks.instagramUrl !== '#' && (
                <Group gap={'sm'} component={Link} href={formatUrl(socialLinks.instagramUrl)} target="_blank" className="!no-underline">
                  <IconBrandInstagram stroke={2} />
                  <Text>Instagram</Text>
                </Group>
              )}
              {socialLinks.youtubeUrl && socialLinks.youtubeUrl !== '#' && (
                <Group gap={'sm'} component={Link} href={formatUrl(socialLinks.youtubeUrl)} target="_blank" className="!no-underline">
                  <IconBrandYoutube stroke={2} />
                  <Text>YouTube</Text>
                </Group>
              )}
            </Group>
          </Group>
        </Paper>
      </Container>
    </footer>
  );
};

export default Footer;
