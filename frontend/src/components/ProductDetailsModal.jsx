import React, {useState, useEffect, useRef} from 'react';
import { Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useProductStore } from '../store/product';
import SuggestedProducts from "../components/SuggestedProducts";
import SuggestedProductsMobile from "../components/SuggestedProductsMobile";

const ProductDetailsModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screen

 


  // Zustand store subscription
  const { selectedProduct, setSelectedProduct, clearSelectedProduct, products, sortedProducts, setSortedProducts } = useProductStore();

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Reset scroll position to 0 when 'products' changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedProduct]); // Dependency array ensures effect runs when 'products' changes


  const handleClose = () => {
    clearSelectedProduct(); // Unset product to close modal
  };



  if (!selectedProduct) return null; // Don't render if no product is selected





  return (
    <Dialog
  //  key={selectedProduct._id}
  open={selectedProduct}
  onClose={handleClose}
  fullScreen={isMobile} // Full screen for mobile
  PaperProps={{
    style: isMobile
      ? {
          borderRadius: '16px 16px 0 0',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }
      : {
          borderRadius: '16px',
          maxWidth: '80%', // Use maxWidth instead of width for responsiveness
          maxHeight: '85%',
          width: 'calc(100vw - 64px)', // Dynamically adjust width
          height: 'calc(100vh - 32px)', // Dynamically adjust height
          margin: 'auto',
        },
  }}
  // TransitionComponent={isMobile ? Slide : undefined}
  // TransitionProps={isMobile ? { direction: 'up' } : undefined}
>

      {/* Header with Close and Share buttons */}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Box>

      {/* Modal Content */}
      <DialogContent
        ref={scrollContainerRef}
        style={{
          padding: '16px',
          paddingBottom: isMobile ? '80px' : '16px',
          overflowY: 'auto',
          backgroundColor: '#fff',
          justifyContent: 'center',
        }}
      >
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          style={{
            width: '200px',
            height: '200px',
            align: 'center',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        />
        <h2>{selectedProduct.name}</h2>
        <p>Price: ${selectedProduct.price}</p>
        <p>Aisle Number: {selectedProduct.aisle}</p>
        <p>{selectedProduct.description}</p>

        <h3>Suggested Products</h3>
       

        {/* {[...products]
          .sort(() => Math.random() - 0.5) // Randomize the array
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))} */}

        {
          isMobile ?
          <SuggestedProductsMobile products={sortedProducts}/>
          :
          <SuggestedProducts products={sortedProducts}/>
        }









      </DialogContent>

      {/* Fixed Bottom Box for Mobile */}
      {isMobile && (
        <Box
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
        </Box>
      )}
    </Dialog>
  );
};

export default ProductDetailsModal;
