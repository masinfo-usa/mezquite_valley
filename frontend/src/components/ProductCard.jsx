import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {updateProduct, deleteProduct} = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProduct(pid)
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }else{
            toast({ 
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async(pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }else{
            toast({ 
                title: "Success",
                description: "Product updated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } 

    }

    return (
    <Box
    key={product.id} 
    //shadow='lg'
    rounded='lg'
    borderWidth={0}
    borderColor={"#dfdbce"}
    transition='all 0.1s'
    _hover={{transform: "translateY(-1px)"}}
    align="center"
    aspectRatio={1 / 1.3}
    display="flex" 
    flexDirection="column" 
    alignItems="stretch"
    onClick={() => onOpen()}
    >
    
        <Box borderRadius="lg" overflow="hidden" height="55%" width={"90%"} m={3}>
            <Image src={product.image} alt={product.name} height="100%" width="100%" objectFit="cover" />
        </Box>


        <Box align={"center"}>
        <Button width={"90%"} bg={"green.300"} color={"white"} fontSize={"100%"} 
            onClick={(e) => {
                e.stopPropagation(); // Prevent the event from bubbling up to the parent
                console.log("Button Clicked");
              }}>+ Add to Cart</Button>
            <Text fontWeight='bold' align={"left"} fontSize={"120%"} color={textColor} ml={3}>
                ${product.price}
            </Text>

            <Text fontWeight='normal' align={"left"} fontSize={"100%"} ml={3}>
                {product.name}
            </Text>
            

            {
            (false && (
            <HStack spacing={2}>
                <IconButton icon={<EditIcon />} onClick={() => onOpen()} colorScheme='blue'/>
                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
            </HStack>)
            )}
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent  maxW={"80vw"} >
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                    <Input
                        placeholder='Product Name'
                        name='name'
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input
                        placeholder='Image URL'
                        name='image'
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} 
                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                        Update                            
                    </Button>
                    
                    <Button variant={'ghost'} onClick={onClose}>
                        Cancel                            
                    </Button>
                    
                </ModalFooter>

            </ModalContent>
        </Modal>

    </Box>
    )
}

export default ProductCard