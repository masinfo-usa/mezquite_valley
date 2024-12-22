import { Alert, Box, Button, IconButton, Skeleton, Snackbar, Typography } from "@mui/material";
import { Add, Remove, Delete } from '@mui/icons-material';
import { useProductStore } from '../store/product';
import { useState, useEffect } from "react";

const ProductPanel = ({ product }) => {
  const { addOneToCart, removeOneFromCart, deleteFromCart } = useProductStore();
  const { products, setSelectedProduct, setSortedProducts } = useProductStore();
  
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    addOneToCart(product);
    setToast({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
  };

  const handleRemoveFromCart = () => {
    if (product.quantity > 1) {
      removeOneFromCart(product);
      setToast({ open: true, message: `One ${product.name} removed from cart.`, severity: 'info' });
    } else {
      deleteFromCart(product._id);
      setToast({ open: true, message: `${product.name} removed from cart.`, severity: 'info' });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <>
      {loading ? (
        <Box
          name="panelParentGridSkeleton"
          sx={{
            display: 'grid',
            gridTemplateColumns: '72px auto auto',
            gap: 0,
            pl: 0,
            pb: 3,
            mb: 3,
            ml: 0,
            borderBottom: '1px solid #e1e1e1',
            backgroundColor: '#fff',
          }}
        >
          {/* Skeleton for Product Image */}
          <Skeleton variant="rectangular" width="90%" height={72} sx={{ borderRadius: 2 }} />

          {/* Skeleton for Product Details */}
          <Box sx={{ display: 'flex', flexDirection: 'column', pl: 0 }}>
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="60%" height={18} />
          </Box>

          {/* Skeleton for Price Details */}
          <Skeleton variant="text" width="50%" height={50} sx={{ textAlign: 'right' }} />
        </Box>
      ) : (
        <Box
          name="panelParentGrid"
          sx={{
            display: 'grid',
            gridTemplateColumns: '54px auto auto',
            gap: 0,
            pl: 0,
            pb: 2,
            mb: 2,
            ml: 0,
            fontFamily: 'Roboto Slab',
            borderBottom: '1px solid #e1e1e1',
            backgroundColor: '#fff',
          }}

          onClick={(e) => {
            setSortedProducts([...products].sort(() => Math.random() - 0.5));
            setSelectedProduct(product);
          }}
        >
          {/* Product Image */}
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              gridColumn: '1',
              gridRow: '1/2',
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 2,
              objectFit: 'cover',
              backgroundColor: '#fff'
            }}
          />

          {/* Product Details */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pl: 1,
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            {/* Title and Price Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 0.25,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  fontSize: '0.9rem',
                  flex: 1,
                  fontFamily: 'Roboto Slab',
                  marginRight: 1,
                  color: '#777777',
                }}
              >
                {product.name}
              </Typography>
            </Box>

            {/* Extra Info */}
            {true && (
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: '#fff',
                  color: '#555',
                  fontSize: '0.75rem',
                  fontFamily: 'Roboto Slab',
                  marginBottom: 0,
                }}
              >
                {product.extraInfo}
                {true ? '$'+(product.price) + ' / ' + product.measuringUnit : ''}
                
              </Typography>
            )}
          </Box>

          {/* Price Details */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#333',
                fontSize: '0.9rem',
                pr: 1,
                fontFamily: 'Roboto Slab',
              }}
            >
              ${(product.price * product.quantity).toFixed(2)}
            </Typography>
            {true && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  fontSize: '0.85rem',
                  color: '#f77b72',
                  pr: 1,
                  fontFamily: 'Roboto Slab',
                }}
              >
                $24.99 {product.priceBeforeDiscount}
              </Typography>
            )}
          </Box>

          {/* Action Row */}
          <Box
            sx={{
              display: 'flex',
              gridColumn: '2/4',
              gridRow: '2',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 'auto',
              backgroundColor: '#fff',
            }}
          >
            {/* Remove Button */}
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.0,
                color: '#999999',
                borderRadius: 2,
                mr: 3,
              }}
              onClick={(e) => {
                e.stopPropagation();
                deleteFromCart(product._id);}}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: '#999999',
                  fontFamily: 'Roboto Slab',
                  textDecoration: 'underline',
                  textTransform: 'none',
                }}
              >
                Remove
              </Typography>
            </Button>

            {/* Quantity Adjuster */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                color: 'yellow',
                borderRadius: 2,
                border: '1px solid #e2e2e2',
                padding: '0 0px',
                width: '135px',
                marginRight: 1,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                size="small"
                sx={{ color: '#727272' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart();
                }}
              >
                {product.quantity === 1 ? <Delete fontSize="sm" sx={{ ml: '3px' }} /> : <Remove />}
              </IconButton>
              <Typography
                sx={{
                  color: '#727272',
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto Slab',
                }}
              >
                {product.quantity}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: '#727272' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductPanel;
