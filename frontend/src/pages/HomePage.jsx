import { Box, Container, Grid, Typography, Link } from "@mui/material";
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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography
          variant="h4"
          fontWeight="semibold"
          alignSelf="flex-start"
          color="text.primary"
          ml={2}
        >
          Chicken
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

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
