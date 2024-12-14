import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import ProductCard from "./ProductCard";



const ProductDetailsModal = ({ products, product, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile} // Full screen for mobile
      PaperProps={{
        style: isMobile
          ? {
              borderRadius: '16px 16px 0 0', // Rounded corners for mobile
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 'calc(100% - 0px)', // Full height on mobile
            }
          : {
              borderRadius: '16px',
              width: '80%',
              height: '80%',
              margin: 'auto', // Centered on desktop
            },
      }}
      TransitionComponent={isMobile ? Slide : undefined} // Slide transition for mobile
      TransitionProps={isMobile ? { direction: 'up' } : undefined}
    >
      {/* Header with Close and Share buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </div>

      {/* Modal Content */}
      <DialogContent
        style={{
          padding: '16px',
          paddingBottom: isMobile ? '80px' : '16px', // Add bottom space for mobile fixed box
          overflowY: 'auto',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        />
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Aisle Number: {product.aisle}</p>
        <p>{product.description}</p>

        <h3>Suggested Products</h3>
        <Box
          name="panelParentGrid"
          sx={{
            display: 'grid',
//            gridTemplateColumns: `repeat(${aspectRatio * 2}, 1fr)`,
            gridTemplateColumns: {
              xs: `repeat(2, 1fr)`,
              sm: `repeat(2, 1fr)`, 
              md: `repeat(4, 1fr)`, 
              lg: `repeat(5, 1fr)`, 
              xl: `repeat(5, 1fr)`,
            },
            
            columnGap: `${3}vh`,
            rowGap: `${2.5}vh`,
            pb: 3,
            mb: 3,
            justifyContent:'space-evenly',
            fontFamily: 'Roboto Slab',
            backgroundColor: '#fff',
          }}
        >
          {products.map((product) => (
              <ProductCard product={product} onCardClick={() => handleCardClick(product)}/>
          ))}


        </Box>

        {/* Add to Cart Button for Desktop */}
        {!isMobile && (
          <button
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1976d2',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
              marginTop: '16px',
            }}
          >
            Add to Cart
          </button>
        )}
      </DialogContent>

      {/* Fixed Bottom Box for Mobile */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            padding: '16px',
            borderTop: '1px solid #ddd',
            boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#1976d2',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
    </Dialog>
  );
};

export default ProductDetailsModal;
