import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const { updateProduct, deleteProduct } = useProductStore();
  const theme = useTheme();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setToast({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsModalOpen(false);
    setToast({
      open: true,
      message: success ? 'Product updated successfully!' : message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <>
      <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: {
      xs: "180PX",
      sm: "200px", 
      md: "200px", 
      lg: "250px", 
      xl: "250px"
    },
    
    
    border: '0.0px solid #000000',
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'transform 0.1s',
    '&:hover': { transform: 'translateY(0px)' },
    overflow: 'hidden', // Prevent content from spilling outside the box
  }}
  onClick={handleOpenModal}
>
  <Box
    component="img"
    src={product.image}
    alt={product.name}
    sx={{
      width: '100%', // Ensures image fills the container
      objectFit: 'cover', // Ensures the image fits within the container
      borderRadius: 2,
      aspectRatio: '1 / 1.12', // Maintains a specific aspect ratio
    }}
  />





  <Box
    sx={{
      border: '0px solid red',
      width: '100%',
      padding: 0,
      mt: '5px',
      '&:last-child': {
        paddingBottom: 0, // Removes default padding applied to the last child
      },
    }}
  >
    <Button
      fullWidth
      variant="outlined"
      color="success"
      sx={{ mb: 1 }}
      onClick={(e) => {
        e.stopPropagation();
        console.log('Button Clicked');
      }}
    >
      + Add to Cart
    </Button>
    <Typography variant="h6" color="text.primary" align="left">
      ${product.price}
    </Typography>
    <Typography variant="body1" color="text.secondary" align="left">
      {product.name}
    </Typography>
    {false && (
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <IconButton color="primary" onClick={handleOpenModal}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => handleDeleteProduct(product._id)}>
          <Delete />
        </IconButton>
      </Box>
    )}
  </Box>
</Box>


      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{m:3}}>
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
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
          >
            Update
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
