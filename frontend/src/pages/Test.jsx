import React from 'react';
import { useProductStore } from "../store/product";
import { Drawer, IconButton, Box, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const Test = () => {
    const {
        cartItems, addOneToCart,
        removeOneFromCart, deleteFromCart, updateCartItemQuantity,
    } = useProductStore();
      

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, backgroundColor: '#eee' }}>
        <Typography variant="h6">My Store</Typography>
        <IconButton onClick={toggleDrawer}>
          <ShoppingCart />
        </IconButton>
      </Box>

      {/* Product List */}
      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        <ProductCard product={{ _id: 1, name: 'Product 1', price: 100 }} addToCart={addOneToCart} />
        <ProductCard product={{ _id: 2, name: 'Product 2', price: 150 }} addToCart={addOneToCart} />
      </Box>

      {/* Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ p: 2, flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>Cart Items</Typography>
            {cartItems.length === 0 ? (
              <Typography>No items in the cart.</Typography>
            ) : (
              cartItems.map((item) => (
                <Box key={item._id} sx={{ mb: 2, p: 1, border: '1px solid #ddd', borderRadius: 2 }}>
                  <Typography variant="subtitle1">
                    {item.name}: {item.quantity}
                  </Typography>
                  <Typography variant="body2">Price per unit: ${item.price}</Typography>
                  <Typography variant="body2">Total: ${item.price * item.quantity}</Typography>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => deleteFromCart(item._id)}
                    sx={{ textTransform: 'none', textDecoration: 'underline', mt: 1 }}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            )}
          </Box>
          {/* Checkout */}
          <Box sx={{ p: 2, borderTop: '1px solid #ddd' }}>
            <Typography variant="subtitle1" gutterBottom>
              Total: ${calculateTotalPrice()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                alert('Proceeding to checkout!');
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

const ProductCard = ({ product, addToCart }) => {
  return (
    <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 2 }}>
      <Typography variant="subtitle1">{product.name}</Typography>
      <Typography variant="body2">Price: ${product.price}</Typography>
      <Button variant="outlined" onClick={() => addToCart(product)} sx={{ mt: 2 }}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default Test;
