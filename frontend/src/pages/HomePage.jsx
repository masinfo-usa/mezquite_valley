import {Box, Container, SimpleGrid, Text, textDecoration, VStack} from "@chakra-ui/react"
import {Link} from 'react-router-dom'
import { useProductStore } from "../store/product"
import { useEffect } from "react"
import ProductCard from "../components/ProductCard"

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()

  useEffect(()=>{
    fetchProducts();
  }, [fetchProducts]);

  console.log('products', products)

  return (
    <Container maxW={['95%', '90%', '70%']} py={5}>
      <VStack spacing={8}>
      
      <SimpleGrid
        minChildWidth="200px"
        spacing={5}
        width={'full'}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product}/> 
        ))}
      </SimpleGrid>

      {products.length === 0 && (
        <Text
        fontSize="xl"
        fontWeight={"bold"}
        textAlign={"center"}
        color={"grey.500"}
      >
        No Products Found 😢{" "}

        <Link to={"/create"}>
          <Text as='span' color='blue.500' _hover={{textDecoration: 'underline'}}>
            Create a Product
          </Text>
        </Link>

      </Text>
      )}

      </VStack>

      <Box p={6} mt="120px">
        <Text>Welcome to Your Brand. Scroll down to see more content...</Text>
        <Box height="1000px"></Box>
      </Box>
    </Container>
  )
}

export default HomePage