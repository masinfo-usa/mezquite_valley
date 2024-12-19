import React, { useState, useEffect, useRef } from 'react';
import { Box, Dialog, DialogContent, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, Skeleton, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useProductStore } from '../store/product';
import SuggestedProducts from "../components/SuggestedProducts";
import SuggestedProductsMobile from "../components/SuggestedProductsMobile";
import FullImageModal from "./FullImageModal"; // Adjust the path
import withLoadingSkeleton from './SkeletonForComponent';  // Import HOC

const ProductDetailsModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    selectedProduct,
    setSelectedProduct,
    clearSelectedProduct,
    sortedProducts,
  } = useProductStore();

  const scrollContainerRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000); // Simulate loading delay
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedProduct]);

 const [isFullImageModalOpen, setFullImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const handleClose = () => {
    clearSelectedProduct();
  };

  const handleImageClick = (image, alt) => {
    setImageSrc(image);
    setImageAlt(alt);
    setFullImageModalOpen(true);
  };

  const handleFullImageModalClose = () => {
    setFullImageModalOpen(false);
  };



  if (!selectedProduct) return null;

  return (
    <>
    <Dialog
      open={!!selectedProduct}
      onClose={handleClose}
      fullScreen={isMobile}
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
              maxWidth: '80%',
              maxHeight: '85%',
              margin: 'auto',
            },
      }}
    >
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

      <DialogContent
        ref={scrollContainerRef}
        style={{
          padding: '16px',
          paddingBottom: isMobile ? '80px' : '16px',
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
          <Skeleton variant="rectangular" width={200} height={200} sx={{borderRadius: "16px"}}/>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Box>
        ) : (
          <>
          <Box
            onClick={() =>
              handleImageClick(selectedProduct.image, selectedProduct.name)
            }
            style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          </Box>


          <Box style={{ marginTop: '16px' }}>
          <Typography variant="h5">{selectedProduct.name}</Typography>
          <Box style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <Typography fontSize={'1.5rem'} fontWeight={'bold'} color="#000">
              ${Math.floor(selectedProduct.price)}
              <sup  fontSize={'1.0rem'}>{(selectedProduct.price % 1).toFixed(2).slice(2)}</sup>
            </Typography>
            {selectedProduct.priceBeforeDiscount && (
              <Typography
                variant="body2"
                style={{ textDecoration: 'line-through', marginLeft: '8px' }}
              >
                ${selectedProduct.priceBeforeDiscount}
              </Typography>
            )}
          </Box>

          <Box style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">Aisle Number: {selectedProduct.aisle}</Typography>
          </Box>

          {selectedProduct.stockLeft < 5 && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: '8px' }}
            >
              Only {selectedProduct.stockLeft} left in stock
            </Typography>
          )}
        </Box>

        <Accordion style={{ marginTop: '16px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{selectedProduct.description}</Typography>
          </AccordionDetails>
        </Accordion>
          </>
        )}

        

        <Typography variant="h6" style={{ marginTop: '24px' }}>
          Suggested Products
        </Typography>
        {isMobile ? (
          <SuggestedProductsMobile products={sortedProducts} />
        ) : (
          <SuggestedProducts products={sortedProducts} />
        )}

        <Box style={{ marginTop: '24px' }}>
          <Typography variant="h6">Customer Comments</Typography>
          {selectedProduct.comments && selectedProduct.comments.length > 0 ? (
            selectedProduct.comments.map((comment, index) => (
              <Box key={index} style={{ marginTop: '8px', borderBottom: '1px solid #ddd' }}>
                <Typography variant="body2">{comment}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No comments yet.
            </Typography>
          )}
        </Box>
      </DialogContent>

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


      {/* Full Image Modal */}
      <FullImageModal
        open={isFullImageModalOpen}
        onClose={handleFullImageModalClose}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />

    </>
      


  );
};

export default ProductDetailsModal;
