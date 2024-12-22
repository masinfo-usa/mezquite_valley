import { Box, Container, Typography, Link, Grid2 } from "@mui/material";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products, currentAspectRatio } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };


  let cardCount = 2;
  let cardWPercentage = 0.80;
  let cardWidth = cardWPercentage * window.innerWidth/cardCount;
  let cardsGap = ((1-cardWPercentage) * window.innerWidth)/(cardCount+1);
  let aspectRatio = currentAspectRatio;


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
          Aspect Ratio: {currentAspectRatio.toFixed(2)}, {(currentAspectRatio * 2.5).toFixed(2)}
          {/* {window.innerWidth}x{window.innerHeight},  */}
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
//            gridTemplateColumns: `repeat(${aspectRatio * 2}, 1fr)`,
            gridTemplateColumns: {
              xs: `repeat(2, 1fr)`,
              sm: `repeat(3, 1fr)`, 
              md: `repeat(4, 1fr)`, 
              lg: `repeat(5, 1fr)`, 
              xl: `repeat(5, 1fr)`,
            },
            
            columnGap: `${aspectRatio * 3}vh`,
            rowGap: `${aspectRatio * 4}vh`,
            pb: 3,
            mb: 3,
            justifyContent:'space-evenly',
            fontFamily: 'Roboto Slab',
            backgroundColor: '#fff',
          }}
        >
          {products.map((product) => (
              //<Typography>hjlkjlkj</Typography>
              
              <ProductCard key={product._id} product={product}/>
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

      {/* <Box sx={{ p: 3, mt: "120px" }}>
        <Typography>
          Welcome to Your Brand. Scroll down to see more content...
        </Typography>
        <Box sx={{ height: "1000px" }}></Box>
      </Box> */}




    </Container>





  );
};

export default HomePage;
