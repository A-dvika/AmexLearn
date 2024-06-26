import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { other_images } from '../utils/images';

const Hero = () => {
  return (
    <Box
      bgImage={`url(${other_images.hero_img7})`}
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      height="350px"
      width="100%"
      position="relative"
      top={10}
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Box
          bg="white"
          color="black"
          fontFamily="'Gafata', sans-serif"
          maxWidth="550px"
          width="100%"
          padding="20px"
          textAlign="center"
        >
          <Heading as="h1" fontSize="32px" marginBottom="5px" whiteSpace="nowrap">
            Advance Your Financial Literacy
          </Heading>
          <Text fontSize="16px">
            Unlock a world of financial knowledge with our curated courses. Explore topics from personal finance management to investment strategies.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
