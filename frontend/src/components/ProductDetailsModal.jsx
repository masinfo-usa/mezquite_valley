import React, { useState, useEffect, useRef } from 'react';
import { Box, Dialog, DialogContent, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, Skeleton, Tooltip, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { useProductStore } from '../store/product';
import SuggestedProducts from "../components/SuggestedProducts";
import SuggestedProductsMobile from "../components/SuggestedProductsMobile";
import FullImageModal from "./FullImageModal"; // Adjust the path
import withLoadingSkeleton from './SkeletonForComponent';  // Import HOC
import { Add, Remove, Delete } from '@mui/icons-material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const ProductDetailsModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  
  const { addOneToCart, removeOneFromCart, deleteFromCart, cartItems } = useProductStore();




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

  const itemInCart = cartItems.find((item) => item._id === selectedProduct._id);
  selectedProduct.quantity = itemInCart?.quantity || 0;




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
      TransitionComponent={isMobile ? Slide : undefined}
      TransitionProps={isMobile ? { direction: 'up' } : undefined}
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



<>

<Box
  sx={{
    display: "grid",
    maxWidth: '100%',
    justifyContent: "center", // Centers the grid container horizontally
    justifyItems: "center", // Centers the grid items horizontally
    alignContent: "center", // Centers the grid container vertically (if parent allows)
    gridTemplateColumns: {
      xs: "1fr", // Single column for extra small screens
      sm: "1fr", // Single column for small screens
      md: "1fr 1fr", // Two columns with auto width for medium screens and larger
      lg: "1fr 1fr", // Two columns with auto width for medium screens and larger
    },
    gap: isMobile ? 2 : 5, // Spacing between items
    backgroundColor: "#fff", // Background color for grid container
    pb: 4, // Padding for grid container
  }}
>
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#fff', }}
                  >
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    onClick={() =>
                      handleImageClick(selectedProduct.image, selectedProduct.name)
                    }
                    
                    style={{
                      width: isMobile ? '250px' : (isTablet ? '300px' : '300px'),
                      height: isMobile ? '250px' : (isTablet ? '300px' : '300px'),
                      objectFit: 'cover',
                      borderRadius: '8px', 
                      cursor: 'pointer'
                    }}
                  />
                  </Box>
                
                  <Box 
                  name= 'detailsBox'
                  sx={{ position: 'relative', p: 2, 
                  width: {xs:'100%', sm:'100%', md:'100%', lg:'100%', xl:'100%'}, 
                  backgroundColor: '#f9f9f9', border: '1px solid #bbb', borderRadius: '16px' }}>
                    {/* <Typography fontFamily={'Roboto Slab'} fontSize={'1.8rem'} fontWeight={'normal'}>{selectedProduct.name}</Typography> */}

                    <Accordion sx={{ 
                  
                  width: isMobile ? 'auto' : 'auto', 
                  backgroundColor: 'transparent',
                  boxShadow: 'none', 
                  borderTop: '0px solid #f9f9f9', 
                  borderBottom: '1px solid #ddd', 
                  borderLeft: '0px solid #ddd', 
                  borderRight: '0px solid #ddd', 
                  borderRadius: '0px' }}
                  
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p:'0px', borderRadius: '0px'}}>
                    <Typography fontFamily={'Roboto Slab'} fontSize={'1.8rem'} fontWeight={'normal'}>{selectedProduct.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{pl:'0px', borderRadius: '0px'}}>
                      <Typography sx={{p:'0px', borderRadius: '0px'}}>
                      One package of Tyson All Natural Fresh Chicken Breast Tenderloins
                            All-natural, minimally processed fresh chicken with no artificial ingredients
                            22g of protein and 0g of trans fat per serving. Serving size 4 oz.
                            No added preservatives
                            Perfect for grilling and frying{selectedProduct.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>




                    {selectedProduct.stockLeft <= 5 && (
                      <Typography
                      fontFamily={'Roboto Slab'}
                      color="error"
                        style={{ marginTop: '8px' }}
                      >
                        Only {selectedProduct.stockLeft} left in stock
                      </Typography>
                    )}


                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                      <LocationOnIcon fontSize="small" />
                      <Typography fontFamily={'Roboto Slab'}>Aisle Number: {selectedProduct.aisle ? selectedProduct.aisle : 'N/A'}</Typography>
                    </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '15px', mb: isMobile ? 0 : 12 }}>
                      <Typography fontFamily={'Roboto Slab'} fontSize={'2.0rem'} fontWeight={'bold'} color= {selectedProduct.priceBeforeDiscount ? '#00b412' : '#000'}>
                        {selectedProduct.priceBeforeDiscount ? 'Now' : ''} ${Math.floor(selectedProduct.price)}
                        <sup style={{ fontSize:'1.1rem'}}>{(selectedProduct.price % 1).toFixed(2).slice(2)}</sup>
                      </Typography>
                      {selectedProduct.priceBeforeDiscount && (
                        <Typography
                        fontFamily={'Roboto Slab'}
                          style={{ textDecoration: 'line-through', marginLeft: '8px', color: 'gray' }}
                        >
                          ${selectedProduct.priceBeforeDiscount}
                        </Typography>
                      )}
                    </Box>
                    
                    

                    

                   
                    
                   

                    { !isMobile &&
                      (selectedProduct.quantity === 0
                      ? (
                        <Button
                            sx={{
                              display: 'flex',
                              position: 'absolute',
                              bottom: 20,
                              left: '50%', // Start at the center of the parent
                              transform: 'translateX(-50%)', // Adjust to be perfectly centered
                              backgroundColor: 'yellow',
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              fontFamily: 'Roboto Slab',
                              height: '55px',
                              textTransform: 'none', // Prevent capitalization
                              justifyContent: 'center', // Center the text
                              alignItems: 'center', // Align text vertically
                              border: '2px solid #000',
                              borderRadius: 2,
                              width: '90%',

                            }}
                            onClick={() => {
                              addOneToCart(selectedProduct);
                            }}
                          >
                           
                            Add to cart
                            
                          </Button>
                      )
                      : (
                        <Box
                      name= 'quantityAdjuster'
                      sx={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 20,
                        left: '50%', // Start at the center of the parent
                        transform: 'translateX(-50%)', // Adjust to be perfectly centered
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#000',
                        color: 'yellow',
                        borderRadius: 2,
                        border: '1px solid yellow',
                        padding: '0 0px',
                        width: '90%',
                      //  height: '45px',
                        mr: 0,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="small"
                          sx={{ color: '#000', 
                            backgroundColor: 'yellow', 
                            fontSize: '30px',
                            m: '5px',
                            width: '44px',
                            height: '44px',
                            borderRadius: 2,
                            border: '1px solid rgb(82, 82, 82)', }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOneFromCart(selectedProduct);
                          }}
                        >
                          {selectedProduct.quantity === 1 ? <Delete sx={{ ml: '0px' }} /> : <Remove />}
                        </Button>
                        <Typography
                            sx={{
                              m: '5px',
                              color: 'yellow',
                              fontSize: 20,
                              fontWeight: 'bold',
                              fontFamily: 'Roboto Slab',
                              textAlign: 'center',
                            }}
                          >
                            {selectedProduct.quantity}
                            <Typography
                              component="span" // Change this to a valid inline or block element
                              sx={{
                                display: 'block', // Forces "In Cart" onto a new line
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto Slab',
                                lineHeight: 1.2,
                              }}
                            >
                              In Cart
                            </Typography>
                          </Typography>

                        <Button
                          size="small"
                          sx={{ 
                            backgroundColor: 'yellow', 
                            color: '#000',
                            fontSize: '30px',
                            m: '5px',
                            width: '44px',
                            height: '44px',
                            borderRadius: 2,
                          }}
                            onClick={(e) => {
                            e.stopPropagation();
                            addOneToCart(selectedProduct);
                          }}
                          
                        >
                          +
                        </Button>
                    </Box>
                      ))
                    }

                  </Box>





                    

                                  


                  

                  
</Box>

                  

                
                 </> 







        {/* {withLoadingSkeleton()({
                isLoading: loading,
                children: (
               

                ),
              })} */}
   
   
        {/* {loading ? (
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


          
          </>
        )} */}

      

        {/* <Typography variant="h6" sx={{ marginTop: '24px', marginLeft: '24px', fontFamily: 'Roboto Slab', fontWeight: 'bold' }}>
          You may also like:
        </Typography> */}
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
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex', // Enable flexbox
            justifyContent: 'center', // Center children horizontally
            alignItems: 'center', // Center children vertically (optional)
            backgroundColor: '#fff',
            padding: '16px',
            borderTop: '2px solid #bbb',
          }}
        >


      <Button
                size="small"
                sx={{ 
                  backgroundColor: '#000', 
                  color: 'yellow',
                  fontSize: '20px',
                  ml: '15px',
                  mr: '15px',
                  height: '55px',
                  textTransform : 'none',
                  pl: 2,
                  pr: 2,
                  borderRadius: 2,
                  border: '1px solid yellow'
                }}
                  onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                
              >
            Close
            </Button>

          
          {
                      selectedProduct.quantity === 0
                      ? (
                        <Button
                            sx={{
                              display: 'flex',
                              backgroundColor: 'yellow',
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              fontFamily: 'Roboto Slab',
                              height: '55px',
                              textTransform: 'none', // Prevent capitalization
                              justifyContent: 'center', // Center the text
                              alignItems: 'center', // Align text vertically
                              border: '2px solid #000',
                              borderRadius: 2,
                              width: '90%',

                            }}
                            onClick={() => {
                              addOneToCart(selectedProduct);
                            }}
                          >
                           
                            Add to cart
                            
                          </Button>
                      )
                      : (
                        <Box
                      name= 'quantityAdjuster'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#000',
                        color: 'yellow',
                        borderRadius: 2,
                        border: '1px solid yellow',
                        padding: '0 0px',
                        width: '90%',
                      //  height: '45px',
                        mr: 0,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="small"
                          sx={{ color: '#000', 
                            backgroundColor: 'yellow', 
                            fontSize: '30px',
                            m: '5px',
                            width: '44px',
                            height: '44px',
                            borderRadius: 2,
                            border: '1px solid rgb(82, 82, 82)', }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOneFromCart(selectedProduct);
                          }}
                        >
                          {selectedProduct.quantity === 1 ? <Delete sx={{ ml: '0px' }} /> : <Remove />}
                        </Button>
                        <Typography
                            sx={{
                              m: '5px',
                              color: 'yellow',
                              fontSize: 20,
                              fontWeight: 'bold',
                              fontFamily: 'Roboto Slab',
                              textAlign: 'center',
                            }}
                          >
                            {selectedProduct.quantity}
                            <Typography
                              component="span" // Change this to a valid inline or block element
                              sx={{
                                display: 'block', // Forces "In Cart" onto a new line
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'Roboto Slab',
                                lineHeight: 1.2,
                              }}
                            >
                              In Cart
                            </Typography>
                          </Typography>

                        <Button
                          size="small"
                          sx={{ 
                            backgroundColor: 'yellow', 
                            color: '#000',
                            fontSize: '30px',
                            m: '5px',
                            width: '44px',
                            height: '44px',
                            borderRadius: 2,
                          }}
                            onClick={(e) => {
                            e.stopPropagation();
                            addOneToCart(selectedProduct);
                          }}
                          
                        >
                          +
                        </Button>
                    </Box>
                      )
                    }

                    


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
