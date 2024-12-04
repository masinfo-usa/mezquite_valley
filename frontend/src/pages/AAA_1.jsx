import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Modal,
  Skeleton,
  Grid,
} from '@mui/material';
import { Add, Remove, ChevronLeft, ChevronRight, Delete } from '@mui/icons-material';

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 4, sampleProducts.length - 4));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  return (
    <Box padding={5}>
      {categories.map((category) => (
        <Box key={category} marginBottom={8}>
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
            <Typography variant="h4">{category}</Typography>
            <Box>
              <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNext} disabled={currentIndex >= sampleProducts.length - 4}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={3}>
                    <Skeleton variant="rectangular" width="100%" height={150} />
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                  </Grid>
                ))
              : sampleProducts.slice(currentIndex, currentIndex + 4).map((product, index) => {
                  const key = `${category}-${index}`;
                  const isInCart = cart[key];
                  return (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="150"
                          image={product.imageUrl}
                          alt="Product"
                          onClick={() => handleCardClick(product)}
                          style={{ cursor: 'pointer' }}
                        />
                        <CardContent>
                          <Typography variant="h6">{product.price}</Typography>
                          <Typography color="textSecondary">{product.weight}</Typography>
                          <Typography variant="body2">{product.details}</Typography>
                        </CardContent>
                        <CardActions>
                          {isInCart ? (
                            <Box display="flex" alignItems="center" width="100%">
                              <IconButton onClick={() => handleRemoveFromCart(index, category)}>
                                {cart[key] === 1 ? <Delete /> : <Remove />}
                              </IconButton>
                              <Typography>{cart[key]}</Typography>
                              <IconButton onClick={() => handleAddToCart(index, category)}>
                                <Add />
                              </IconButton>
                            </Box>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              fullWidth
                              onClick={() => handleAddToCart(index, category)}
                            >
                              + Add to Cart
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
          </Grid>
        </Box>
      ))}

      {/* Modal for Product Details */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width={400}
          bgcolor="background.paper"
          boxShadow={24}
          p={4}
        >
          {selectedProduct && (
            <>
              <Typography variant="h6">{selectedProduct.details}</Typography>
              <img src={selectedProduct.imageUrl} alt="Product" style={{ width: '100%', marginTop: 16 }} />
              <Typography>{selectedProduct.price}</Typography>
              <Typography>{selectedProduct.weight}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AAA_1;
