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
    //shadow='lg'
    rounded='lg'
    borderWidth={0}
    borderColor={"black"}
    overflow='clip'
    transition='all 0.1s'
    _hover={{transform: "translateY(-5px)"}}
    bg={bg}
    aspectRatio={1 / 1.3}
    >
        <Image src={product.image} alt={product.name} h={"55%"} w='full' objectFit='cover' />
        
        <Box p={0} >
            <Text fontWeight='bold' fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} color={textColor} mb={0}>
                ${product.price}
            </Text>

            <Text fontWeight='normal' fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }} mb={0} p={2}>
                {product.name}
            </Text>
            <Button width={"full"} p={"2"} bg={"lightgreen"}>Add to Cart</Button>
            
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