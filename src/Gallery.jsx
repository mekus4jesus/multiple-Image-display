import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Photos } from './Photos';

export const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const ImageToShow = 4;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const initialVisibleImages = Photos.slice(0, ImageToShow);
    setVisibleImages(initialVisibleImages);
  }, []);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    onOpen();
  };

  const closeModal = () => {
    setCurrentImageIndex(null);
    onClose();
  };

  const showPrevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + Photos.length) % Photos.length);
  };

  const showNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % Photos.length);
  };

  const remainingImagesCount = Photos.length - ImageToShow;

  return (
    <Box p={4}>
      <SimpleGrid columns={[2, null, 3]} spacing={4}>
        {visibleImages.map((image, index) => (
          <Image
            key={image.id}
            src={image.ImgSrc}
            alt={`Image ${image.id}`}
            cursor="pointer"
            onClick={() => openModal(index)}
          />
        ))}
        {remainingImagesCount > 0 && (
          <Flex
            position="relative"
            align="center"
            justify="center"
            bg="gray.200"
            cursor="pointer"
            onClick={() => openModal(ImageToShow)}
          >
            <Image
              src={Photos[ImageToShow].ImgSrc}
              alt={`Image ${Photos[ImageToShow].id}`}
              opacity={0.6}
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0, 0, 0, 0.5)"
            >
              <Text fontSize="2rem" color="#fff">
                <AddIcon boxSize={8} color="#fff" /> {remainingImagesCount}
              </Text>
            </Box>
          </Flex>
        )}
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton position="absolute" left="10px" top="10px" />
          <ModalBody>
            {currentImageIndex !== null ? (
              <Box position="relative">
                <Image
                  src={Photos[currentImageIndex].ImgSrc}
                  alt={`Image ${Photos[currentImageIndex].id}`}
                  mx="auto"
                  maxH="80vh"
                />
                <IconButton
                  icon={<ChevronLeftIcon />}
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={showPrevImage}
                  zIndex="1"
                  colorScheme="teal"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={showNextImage}
                  zIndex="1"
                  colorScheme="teal"
                />
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                {Photos.map((image, index) => (
                  <Image
                    key={image.id}
                    src={image.ImgSrc}
                    alt={`Image ${image.id}`}
                    cursor="pointer"
                    onClick={() => openModal(index)}
                  />
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
