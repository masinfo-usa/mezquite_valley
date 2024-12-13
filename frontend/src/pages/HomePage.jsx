import { Box, Container, Typography, Link, Grid2 } from "@mui/material";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products from HomePage: ", products);



  let cardCount = 2;
  let cardWPercentage = 0.80;
  let cardWidth = cardWPercentage * window.innerWidth/cardCount;
  let cardsGap = ((1-cardWPercentage) * window.innerWidth)/(cardCount+1);



  return (
    <Container maxWidth="100%"  sx={{
      backgroundColor: '#fff',
      width: {
        xs: "100%",
        sm: "95%", 
        md: "90%", 
        lg: "75%", 
        xl: "75%"
      },
      p:0
     }}>
      <Box display="flex" flexDirection="column" gap={2} sx={{backgroundColor: '#fff', justifyContent:'center'}}>
        <Typography
          variant="h4"
          fontSize={`30px`}
          fontWeight="semibold"
          alignSelf="flex-start"
          color="text.primary"
          ml={0}
        >
          Chicken 
          {/* {window.innerWidth}x{window.innerHeight}, Aspect Ratio: {(window.innerWidth/window.innerHeight).toFixed(2)} */}
        </Typography>

        {/* <Grid2 container pl={`${cardsGap}px`} columnSpacing={`${cardsGap}px`} rowSpacing={`${cardsGap*1.5}px`} sx={{backgroundColor: '#fff', justifyContent:'flex-start'}}>
          {products.map((product) => (
            <Grid2 item  key={product._id}>
              <ProductCard product={product} />
              </Grid2>
          ))}
        </Grid2> */}


        <Box
          name="panelParentGrid"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            columnGap: '5vw',
            rowGap: '50px',
            pb: 3,
            mb: 3,
            justifyContent:'space-evenly',
            fontFamily: 'Roboto Slab',
            backgroundColor: '#eee',
          }}
        >
          {products.map((product) => (
              <ProductCard product={product} />
          ))}


        </Box>



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
