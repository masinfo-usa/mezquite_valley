import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  Flex,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const categories = ["Chicken", "Goat", "Lamb", "Beef"];
const productImageUrl = "https://images.unsplash.com/photo-1515054562254-30a1b0ebe227?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const generateRandomPrice = () => `$${(Math.random() * 20 + 5).toFixed(2)}`;
const generateRandomWeight = () => `${(Math.random() * 2 + 1).toFixed(1)} lb`;

const sampleProducts = Array(10).fill().map(() => ({
  imageUrl: productImageUrl,
  price: generateRandomPrice(),
  weight: generateRandomWeight(),
  details: "Premium quality meat.",
  quantity: 1,
}));

const AAA_1 = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const handleAddToCart = (productIndex, category) => {
    const key = `${category}-${productIndex}`;
    setCart((prevCart) => ({
      ...prevCart,
      [key]: prevCart[key] ? prevCart[key] + 1 : 1,
    }));
  };

  const handleRemoveFromCart = (productIndex, category) => {
    const key = `${category}-${productIndex}`;
    setCart((prevCart) => {
      if (prevCart[key] <= 1) {
        const { [key]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [key]: prevCart[key] - 1 };
    });
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 4, sampleProducts.length - 4));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  return (
    <Box p={5}>
      {categories.map((category) => (
        <Box key={category} mb={8}>
          <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Text fontSize="2xl" fontWeight="bold">{category}</Text>
            <Box>
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={handlePrev}
                isDisabled={currentIndex === 0}
                bg={currentIndex === 0 ? "gray.200" : "teal.400"}
                _hover={{ bg: "teal.500" }}
                mr={2}
              />
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={handleNext}
                isDisabled={currentIndex >= sampleProducts.length - 4}
                bg={currentIndex >= sampleProducts.length - 4 ? "gray.200" : "teal.400"}
                _hover={{ bg: "teal.500" }}
              />
            </Box>
          </Flex>

          <Flex overflowX={{ base: "scroll", md: "hidden" }} justify="center">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <Box key={idx} width="250px" height="350px" p={4} mr={4}>
                    <Skeleton height="150px" />
                    <Skeleton mt={4} height="20px" width="60%" />
                    <Skeleton mt={2} height="20px" width="40%" />
                    <Skeleton mt={2} height="15px" />
                    <Skeleton mt={2} height="20px" width="80%" />
                    <Skeleton mt={4} height="30px" />
                  </Box>
                ))
              : sampleProducts.slice(currentIndex, currentIndex + 4).map((product, index) => {
                  const key = `${category}-${index}`;
                  const isInCart = cart[key];
                  return (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      width="250px"
                      p={4}
                      mr={4}
                      onClick={() => handleCardClick(product)}
                      cursor="pointer"
                      bg="white"
                      boxShadow="sm"
                    >
                      <Image src={product.imageUrl} alt="Product" width="100%" height="150px" objectFit="cover" borderTopRadius="lg" />
                      <Stack mt={4} spacing={1}>
                        <Text fontSize="lg" fontWeight="bold">{product.price}</Text>
                        <Text fontSize="sm" color="gray.500">{product.weight}</Text>
                        <Text color="gray.500">{product.details}</Text>

                        <Flex alignItems="center" justifyContent="space-between" mt={2}>
                          {isInCart ? (
                            <Flex alignItems="center" bg="teal.100" p={1} borderRadius="md">
                              <IconButton
                                icon={<MinusIcon />}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFromCart(index, category);
                                }}
                                colorScheme="teal"
                                variant="outline"
                              />
                              <Text mx={2}>{cart[key]}</Text>
                              <IconButton
                                icon={<AddIcon />}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(index, category);
                                }}
                                colorScheme="teal"
                                variant="outline"
                              />
                            </Flex>
                          ) : (
                            <Button
                              colorScheme="teal"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(index, category);
                              }}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </Flex>
                      </Stack>
                    </Box>
                  );
                })}
          </Flex>
        </Box>
      ))}

      {/* Modal for Product Details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProduct?.details}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedProduct?.imageUrl} alt="Product Image" boxSize="300px" mx="auto" mb={4} />
            <Text fontSize="lg" fontWeight="bold">{selectedProduct?.price}</Text>
            <Text fontSize="sm" color="gray.500">{selectedProduct?.weight}</Text>
            <Text mt={2}>{selectedProduct?.details}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AAA_1;
