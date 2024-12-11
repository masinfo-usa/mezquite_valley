import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  TextField 
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const collapseTimeout = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addOneToCart, removeOneFromCart, deleteFromCart, cartItems } = useProductStore();

  // Compute the quantity of the current product from the cart
  const itemInCart = cartItems.find((item) => item._id === product._id);
  const itemCount = itemInCart?.quantity || 0;





 
  const { updateProduct, deleteProduct } = useProductStore();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsModalOpen(false);
    setToast({
      open: true,
      message: success ? 'Product updated successfully!' : message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setToast({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });
  };







  const handleExpand = () => {
    setExpanded(true);

    // Clear any existing timeout
    if (collapseTimeout.current) {
      clearTimeout(collapseTimeout.current);
    }

    // Collapse after a timeout
    collapseTimeout.current = setTimeout(() => {
      setExpanded(false);
    }, 2000);
  };

  const handleAddToCart = () => {
    addOneToCart(product);
    handleExpand();
    setToast({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
  };

  const handleRemoveFromCart = () => {
    if (itemCount > 1) {
      removeOneFromCart(product);
      setToast({ open: true, message: `One ${product.name} removed from cart.`, severity: 'info' });
    } else {
      deleteFromCart(product._id);
      setToast({ open: true, message: `${product.name} removed from cart.`, severity: 'info' });
    }
    handleExpand();
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (collapseTimeout.current) {
        clearTimeout(collapseTimeout.current);
      }
    };
  }, []);



  let cardCount = 2;
  let cardWPercentage = 0.80;
  let cardWidth = cardWPercentage * window.innerWidth/cardCount;
  let cardsGap = ((1-cardWPercentage) * window.innerWidth)/(cardCount+1);




  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: {
            xs: `${cardWidth}px`,
            sm: '150px',
            md: '170px',
            lg: '200px',
            xl: '200px',
          },
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={handleOpenModal}
      >
        {/* Product Image */}
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: 2,
            aspectRatio: '1 / 1.02',
          }}
        />

        {/* Expandable Cart Controls */}
        <Box
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'space-between' : 'center',
            backgroundColor: '#000',
            color: 'yellow',
            borderRadius: 5,
            border: itemCount === 0 ? '3px solid #fff' : '3px solid yellow',
            padding: expanded ? '0 5px' : 0,
            width: expanded ? 'calc(80% - 16px)' : 40,
            height: 40,
            transition: 'all 0.3s ease',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {expanded ? (
            <>
              <IconButton
                size="small"
                sx={{ color: 'yellow' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart();
                }}
              >
                {itemCount === 1 ? <Delete /> : <Remove />}
              </IconButton>
              <Typography sx={{ color: 'yellow', fontSize: 16, fontWeight: 'bold' }}>
                {itemCount}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: 'yellow' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                <Add />
              </IconButton>
            </>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                {itemCount===0 ? handleAddToCart() : handleExpand()};
              }}
              sx={{
                minWidth: 0,
                color: 'yellow',
                fontSize: itemCount === 0 ? 25 : 17,
                fontWeight: 'bold',
              }}
            >
              {itemCount === 0 ? '+' : itemCount}
            </Button>
          )}
        </Box>

        {/* Product Info */}
        <Box sx={{ width: '100%', mt: '5px' }}>
          <Typography variant="h6" color="text.primary" align="left">
            ${product.price}
          </Typography>
          <Typography varaiant="body1" color="text.secondary" align="left">
            {product.name}
          </Typography>
        </Box>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={handleToastClose}>
          {toast.message}
        </Alert>
      </Snackbar>




      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ m: 3 }}>
            <TextField
              label="Product Category"
              value={updatedProduct.category}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, category: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Product Name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Image URL"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ m: '20px', justifyContent: 'space-evenly' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            sx={{
              backgroundColor: 'yellow',
              color: '#000',
              fontWeight: 'bold',
              border: '1px solid #000',
              boxShadow: 'none',
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            sx={{
              backgroundColor: '',
              color: '#000',
              fontWeight: 'bold',
              border: '1px solid #000',
              boxShadow: 'none',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={handleToastClose}>
          {toast.message}
        </Alert>
      </Snackbar>



    </>
  );
};

export default ProductCard;
