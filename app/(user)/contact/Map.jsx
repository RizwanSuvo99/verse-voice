import { AspectRatio } from '@mantine/core';

const Map = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.7776947401735!2d91.1724365!3d23.468481999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547ed5ea38a001%3A0xa888b09fb49bc32!2sPolice%20Line%2C%20Cumilla!5e0!3m2!1sen!2sbd!4v1728494003876!5m2!1sen!2sbd"
        title="Google map"
        style={{
          border: 0,
          borderRadius: '15px',
          width: '100%', // Make the iframe take full width of its container
        }}
        height={'500'}
      ></iframe>
    </AspectRatio>
  );
};

export default Map;
