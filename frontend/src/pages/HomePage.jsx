import { Box, Container, Typography, Link, Grid2 } from "@mui/material";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products", products);

  return (
    <Container maxWidth="100%"  sx={{
      backgroundColor: '#fff',
      width: {
        xs: "95%",
        sm: "95%", 
        md: "90%", 
        lg: "75%", 
        xl: "75%"
      },
      p:1
     }}>
      <Box display="flex" flexDirection="column" gap={2} sx={{backgroundColor: '#fff', justifyContent:'center'}}>
        <Typography
          variant="h4"
          fontWeight="semibold"
          alignSelf="flex-start"
          color="text.primary"
          ml={2}
        >
          Chicken {window.innerWidth}x{window.innerHeight}, Aspect Ratio: {(window.innerWidth/window.innerHeight).toFixed(2)}
        </Typography>

        <Grid2 container pl={3} spacing={'5vw'} sx={{backgroundColor: '#fff', justifyContent:'flex-start'}}>
          {products.map((product) => (
            <Grid2 item  key={product._id}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>

        {products.length === 0 && (
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            color="text.secondary"
          >
            No Products Found 😢{" "}
            <Link
              href="/create"
              underline="hover"
              sx={{ color: "primary.main", cursor: "pointer" }}
            >
              Create a Product
            </Link>
          </Typography>
        )}
      </Box>

      <Box sx={{ p: 3, mt: "120px" }}>
        <Typography>
          Welcome to Your Brand. Scroll down to see more content...
        </Typography>
        <Box sx={{ height: "1000px" }}></Box>
      </Box>
    </Container>
  );
};

export default HomePage;
