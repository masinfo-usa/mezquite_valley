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
import { Add, Remove, Edit, Delete } from '@mui/icons-material';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [expanded, setExpanded] = useState(false);
  const [itemCount, setItemCount] = useState(0);

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

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, 2000); // Collapse after 2 seconds
  };

  const handleAdd = () => setItemCount((prev) => prev + 1);
  const handleRemove = () => setItemCount((prev) => (prev > 0 ? prev - 1 : 0));


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

        {/* Expandable Button */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'space-between' : 'center',
            backgroundColor: '#000',
            color: 'yellow',
            borderRadius: 2,
            border: '2px solid #fff',
            padding: expanded ? '0 8px' : 0,
            width: expanded ? 'calc(100% - 16px)' : 40,
            height: 40,
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden',
          }}
        >
          {expanded ? (
            <>
              <IconButton
                size="small"
                sx={{ color: 'yellow' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <Remove />
              </IconButton>
              <Typography sx={{ color: 'yellow', fontSize: 16, fontWeight: 'bold' }}>
                {itemCount}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: 'yellow' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd();
                }}
              >
                <Add />
              </IconButton>
            </>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleExpand();
              }}
              sx={{
                minWidth: 0,
                color: 'yellow',
                fontSize: 17,
                fontWeight: 'bold',
              }}
            >
      {itemCount === 0 ? <Add /> : itemCount}
      </Button>
          )}
        </Box>

        {/* Product Info */}
        <Box sx={{ border: '0px solid red', width: '100%', mt: '5px' }}>
          <Typography variant="h6" color="text.primary" align="left">
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="left">
            {product.name}
          </Typography>
        </Box>
      </Box>

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
