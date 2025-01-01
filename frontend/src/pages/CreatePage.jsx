import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    category: '',
    name: '',
    image: '',
    price: '',
    priceBeforeDiscount: '',
    pricePerQuantity: '',
    description: '',
    aisleNum: '',
    packingType: '',
    packingTimeInMinutes: '',
    measuringUnit: '',
    nutritionPer100Gm: '',
    availableStock: '',
    maxPerOrder: '',
    packingOptions: '',
    orderedQuantity: '',
    ratings: '',
    customerComments: '',
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    setToast({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });

    if (success) {
      setNewProduct({
        category: '',
        name: '',
        image: '',
        price: '',
        priceBeforeDiscount: '',
        pricePerQuantity: '',
        description: '',
        aisleNum: '',
        packingType: '',
        packingTimeInMinutes: '',
        measuringUnit: '',
        nutritionPer100Gm: '',
        availableStock: '',
        maxPerOrder: '',
        packingOptions: '',
        orderedQuantity: '',
        ratings: '',
        customerComments: '',
      });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} my={4}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Create New Product
        </Typography>

        <Box
          width="100%"
          bgcolor={theme.palette.background.paper}
          p={3}
          borderRadius={2}
          boxShadow={3}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Price Before Discount"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.priceBeforeDiscount}
              onChange={(e) => setNewProduct({ ...newProduct, priceBeforeDiscount: e.target.value })}
            />
            <TextField
              label="Price Per Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.pricePerQuantity}
              onChange={(e) => setNewProduct({ ...newProduct, pricePerQuantity: e.target.value })}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <TextField
              label="Aisle Number"
              variant="outlined"
              fullWidth
              value={newProduct.aisleNum}
              onChange={(e) => setNewProduct({ ...newProduct, aisleNum: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Packing Type</InputLabel>
              <Select
                value={newProduct.packingType}
                onChange={(e) => setNewProduct({ ...newProduct, packingType: e.target.value })}
              >
                <MenuItem value="PrePacked">PrePacked</MenuItem>
                <MenuItem value="ToBePrepared">ToBePrepared</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Packing Time (Minutes)"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.packingTimeInMinutes}
              onChange={(e) => setNewProduct({ ...newProduct, packingTimeInMinutes: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Measuring Unit</InputLabel>
              <Select
                value={newProduct.measuringUnit}
                onChange={(e) => setNewProduct({ ...newProduct, measuringUnit: e.target.value })}
              >
                <MenuItem value="Ct">Ct</MenuItem>
                <MenuItem value="Lb">Lb</MenuItem>
                <MenuItem value="Oz">Oz</MenuItem>
                <MenuItem value="Gallon">Gallon</MenuItem>
                <MenuItem value="Kg">Kg</MenuItem>
                <MenuItem value="L">L</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Nutrition Per 100Gm"
              variant="outlined"
              fullWidth
              value={newProduct.nutritionPer100Gm}
              onChange={(e) => setNewProduct({ ...newProduct, nutritionPer100Gm: e.target.value })}
            />
            <TextField
              label="Available Stock"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.availableStock}
              onChange={(e) => setNewProduct({ ...newProduct, availableStock: e.target.value })}
            />
            <TextField
              label="Max Per Order"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.maxPerOrder}
              onChange={(e) => setNewProduct({ ...newProduct, maxPerOrder: e.target.value })}
            />
            <TextField
              label="Packing Options (comma-separated)"
              variant="outlined"
              fullWidth
              value={newProduct.packingOptions}
              onChange={(e) =>
                setNewProduct({ ...newProduct, packingOptions: e.target.value.split(',') })
              }
            />
            <TextField
              label="Ratings"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.ratings}
              onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
            />
            <TextField
              label="Customer Comments (comma-separated)"
              variant="outlined"
              fullWidth
              value={newProduct.customerComments}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  customerComments: e.target.value.split(','),
                })
              }
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleAddProduct}>
              Add Product
            </Button>
          </Box>
        </Box>
      </Box>

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
    </Container>
  );
};

export default CreatePage;
