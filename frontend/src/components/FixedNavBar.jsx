import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  useDisclosure,
  HStack,
  Link,
  VStack,
  List,
  ListItem,
  useBreakpointValue,
  Image,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function FixedNavBar() {
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(5); // Example item count
  const placeholders = ["Try Searching Product_1", "Try Searching Product_2", "Try Searching Product_3"];
  const productSuggestions = ["Product_1", "Product_2", "Product_3", "Product_4", "Product_5"];
  const isMediumScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ChakraProvider>
      {/* Fixed Top Navbar */}
      <Box position="fixed" top="0" width="100%" bg="gray.100" zIndex="1000" shadow="sm">
        <Flex align="center" px={4} py={2} justify="space-between">
          {/* Logo and Hamburger Icon Wrapper */}
          <Flex align="center" minW="180px">
            {isMediumScreen && !isSearchFocused && (
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                onClick={onNavOpen}
                mr={2}
              />
            )}
            <Link href="/" display="flex" alignItems="center" mr={2}>
              <Image
                src="https://www.pngkey.com/png/detail/405-4059414_green-leaf-leaf-logo-transparent-background.png"
                boxSize="40px"
                borderRadius="full"
                alt="Logo"
              />
            </Link>
            {!isSearchFocused && (
              <Text fontSize="lg" fontWeight="bold" as="a" href="/" cursor="pointer">
                Your Brand
              </Text>
            )}
          </Flex>

          {/* Search Bar */}
          <InputGroup
            maxW={isSearchFocused && isMediumScreen ? "100%" : isMediumScreen ? "70%" : "50%"}
            mx={4}
          >
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
            <Input
              placeholder={placeholders[placeholderIndex]}
              value={searchText}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchText(e.target.value)}
              _focus={{ boxShadow: '0 0 0 1px #3182ce', borderColor: '#3182ce' }}
            />
            {isSearchFocused && isMediumScreen && (
              <Button ml={2} onClick={() => { setIsSearchFocused(false); setSearchText(''); }}>
                Cancel
              </Button>
            )}
          </InputGroup>

          {/* Log In Button and Cart */}
          <Flex align="center" minW="140px" justify="flex-end" display={!isSearchFocused || !isMediumScreen ? "flex" : "none"}>
            {!isMediumScreen && (
              <Button as="a" href="/login" colorScheme="blue" mr={2}>
                Log In
              </Button>
            )}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={cartItemCount > 0 ? "green.500" : "gray.300"}
              borderRadius="full"
              padding="10px"
              cursor="pointer"
              onClick={onCartOpen}
            >
              <FaShoppingCart fontSize="24px" color="white" />
              <Text color="white" ml={1} fontWeight="bold">
                {cartItemCount > 0 ? cartItemCount : ""}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Product Suggestions */}
      {searchText && (
        <Box position="absolute" bg="white" shadow="md" width="80%" maxW="sm" borderRadius="md" mt={1} ml="10%">
          <List spacing={2}>
            {productSuggestions
              .filter((product) => product.toLowerCase().includes(searchText.toLowerCase()))
              .map((suggestion) => (
                <ListItem key={suggestion} p={2} _hover={{ bg: "gray.100" }}>
                  {suggestion}
                </ListItem>
              ))}
          </List>
        </Box>
      )}

      {/* Custom Cart Drawer with Slide Transition */}
      <MotionBox
        position="fixed"
        top="0"
        right="0"
        height="100%"
        width="400px"
        bg="gray.200"
        boxShadow="md"
        initial={{ x: 400 }} // Start off-screen
        animate={isCartOpen ? { x: 0 } : { x: 400 }} // Slide in or out
        transition={{ duration: 0.1 }} // 0.1 seconds transition
        zIndex="1000"
      >
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close Drawer"
          onClick={onCartClose}
          variant="ghost"
          position="absolute"
          top={4}
          left={4} // Changed to top left
        />
        <VStack spacing={4} p={4}>
          <Text fontSize="2xl" fontWeight="bold">Your Cart</Text>
          <Text>Cart Items go here</Text>
          {/* Add cart items here */}
        </VStack>
      </MotionBox>

      {/* Navbar Drawer for Small Screens with Slide Transition */}
      <MotionBox
        position="fixed"
        top="0"
        left="0"
        height="100%"
        width="250px"
        bg="gray.200"
        boxShadow="md"
        initial={{ x: -250 }} // Start off-screen
        animate={isNavOpen ? { x: 0 } : { x: -250 }} // Slide in or out
        transition={{ duration: 0.1 }} // 0.1 seconds transition
        zIndex="1000"
      >
        <IconButton
          icon={<CloseIcon />}
          aria-label="Close Drawer"
          onClick={onNavClose}
          variant="ghost"
          position="absolute"
          top={4}
          right={4}
        />
        <VStack align="start" spacing={4} mt={10} p={4}>
          <Link href="#home" onClick={onNavClose}>Home</Link>
          <Link href="#our-story" onClick={onNavClose}>Our Story</Link>
          <Link href="#our-process" onClick={onNavClose}>Our Process</Link>
          <Link href="#contact-us" onClick={onNavClose}>Contact Us</Link>
          <Link href="#halal-certifications" onClick={onNavClose}>Halal Certifications</Link>
          <Link href="#faqs" onClick={onNavClose}>FAQs</Link>
          <Button as="a" href="/login" colorScheme="blue" mt={4} onClick={onNavClose}>
            Log In
          </Button>
        </VStack>
      </MotionBox>
    </ChakraProvider>
  );
}

export default FixedNavBar;
