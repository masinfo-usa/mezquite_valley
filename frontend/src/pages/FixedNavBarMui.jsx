import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
  Badge,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product";

import { Add, Remove, Delete } from '@mui/icons-material';


const MotionBox = motion(Box);

const theme = createTheme({
  palette: {
    primary: {
      main: "#108910",
    },
    secondary: {
      main: "#f7f5f0",
    },
  },
});




function FixedNavBarMui() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(5); // Example item count
  const placeholders = [
    "Search Product, Recipes, Etc...",
    "Search Chicken Breast",
    "Search Thigh Boneless",
  ];
  const productSuggestions = [
    "Halal Beef",
    "Chicken Breast",
    "Lamb Full",
    "Beef Brisket",
    "Thigh Boneless",
  ];
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);



  const {
    cartItems, addOneToCart, removeOneFromCart, 
    deleteFromCart, updateCartItemQuantity, calculateTotalPrice
  } = useProductStore();
  


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "transparent", zIndex: theme.zIndex.drawer - 1, boxShadow: 'none', 
               }}>
        <Toolbar 
        
        sx={{ backgroundColor: '#000',//"#f7f5f0",  
        borderBottom: "1px solid #dfdbce",
        m:0, p:1, 
        boxShadow: 'none' , display:'flex',
        justifyContent: "space-around", // Spread left and right sections
        alignItems: "center", // Center vertically
          
      }}>
          
          {/* MenuIcon */}
          {isMediumScreen && !isSearchFocused && (
            <IconButton
              edge="start"
              onClick={() => setNavOpen(true)}
              sx={{ marginLeft: '0px',
                marginRight: '2px',
                backgroundColor: 'default', 
                color: 'yellow', 
                borderRadius: '8px',
                
               }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Title */}
          {!(isMediumScreen && isSearchFocused) && (
            <Typography variant="h6" fontWeight={'bold'} color="#fff"  component="a" href="/" sx={{ minWidth:'30%', textDecoration: 'none' }}>
              Your Brand
            </Typography>
          )}
            
            <Box name="searchMainBg"
              sx={{
                backgroundColor: "#fff",
                width: '100%',
                position: "relative",
                display: "flex",
                justifyContent: 'space-evenly',
                alignItems: "center",
                borderRadius: 10,
                border: isSearchFocused ? '2px solid #000' :'1px solid #BBB7AA', // Ensure border is set on the container
              }}
            >
              <Box name='searchicon'
                sx={{position: "relative", left: 5,
                  color: "gray", display: "flex",
                  alignItems: "center"
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder={placeholders[0]}
                value={searchText}
                onFocus={() => setIsSearchFocused(true)}
               // onBlur={() => setIsSearchFocused(false)}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                  backgroundColor: "#fff",
                  padding: "6px 2px 6px 5px",
                  borderRadius: 5,
                  flex: 0.95,
                }}
              />


              
              

              {!isMediumScreen && (
                <IconButton name='searchClose'
                onClick={() => {
                  setIsSearchFocused(false);
                  setSearchText("");
                }}
                sx={{position: "relative", 
                  backgroundColor: 'transparent',
                  color: "gray", display: "flex",
                  mr: '0px',
                  visibility: isSearchFocused && !isMediumScreen ? 'visible' : 'hidden',
                  '&:hover': {
                    backgroundColor: '', // No background color on hover
                  },
                  '&:active': {
                    backgroundColor: '', // No background color on press
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              )}
            

          </Box>
          {isSearchFocused && isMediumScreen && (
                <Button
                  onMouseUp={() => {
                    setIsSearchFocused(false);
                    setSearchText("");
                  }}
                  sx={{ marginLeft: 1, color:'#fff', textTransform:'none', backgroundColor: '#727272' }}
                >
                  Cancel
                </Button>
              )}
              
          {!(isSearchFocused || isMediumScreen) && (
              <Button
              name='Login'
              variant="contained"
              href="/Login"            
              sx={{
                display: 'flex',
                bgcolor:"#4287f5",
                alignItems: 'center',
                borderRadius: 20, 
                padding: '8px 16px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 1,
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                Login
            </Button>
            )}

          {!(isSearchFocused && isMediumScreen) && (
              <Button
              name='cart'
              variant="contained"
              onClick={() => setCartOpen(true)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'yellow',
                borderRadius: 20, 
                padding: '5px 10px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 1,
                fontWeight: 'bold',
                fontSize: '15px',
                color:'#000',
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                <ShoppingCartIcon sx={{ marginRight: 0, color:'#000' }} />
                {cartItems.length}
            </Button>
            )}
        </Toolbar>
      </AppBar>

      <Drawer
  anchor="right"
  open={isCartOpen}
  onClose={() => setCartOpen(false)}
  SlideProps={{
    timeout: {
      enter: 100,
      exit: 100,
    },
    
  }}
  sx={{
    '& .MuiDrawer-paper': {
      width: {
        xs: "100%",
        sm: "100%",
        md: "50%",
        lg: "30%",
        xl: "25%"
      },
    },
  }}
>
  <Box
    name="cart_header"
    sx={{
      backgroundColor: '#fff',
      display: 'flex',
      position: 'sticky',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
      padding: 0.5,
      borderBottom: '2px solid #d0d0d0',
    }}
  >
    <IconButton
  onClick={() => setCartOpen(false)}
  sx={{
    borderRadius: 2,
    zIndex: 1,
    width: '45px',
    height: '45px',
    justifySelf: 'center',
    color: '#000',
    '&:hover': {
      color: '', // Color when hovered
      backgroundColor: 'rgba(235, 235, 235, 0.99)', // Optional: background color on hover
    },
    '&:active': {
      color: '', // Color when clicked/pressed
      backgroundColor: 'rgba(235, 235, 235, 0.99)', // Optional: background color when pressed
    },
  }}
>
  <CloseIcon />
</IconButton>

    <Typography
      variant="h6"
      gutterBottom
      sx={{
        color: '#000',
        mr: '10%',
        width: '100%',
        mt: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:'Roboto Slab'
      }}
    >
    Your Cart
    </Typography>

    <Typography
      variant="h6"
      gutterBottom
      sx={{
        color: '#000',
        mr: '10%',
        width: '100%',
        mt: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:'Roboto Slab'
      }}
    >
    Free delivery on order above $35
    </Typography>

  </Box>

    {/* Cart Items */}
    
    <Box sx={{ pl: 1, flexGrow: 1, overflowY: 'auto', backgroundColor: '#fff'}}>
      <Typography variant="h6" fontFamily='Roboto Slab' gutterBottom>
        Cart Items
      </Typography>
      {cartItems.length === 0 ? (
        <Typography fontFamily='Roboto Slab'>No items in the cart.</Typography>
      ) : (
        cartItems.map((item) => (
          
          <Box
          name='panelParentGrid'
          sx={{
            display: 'grid',
            gridTemplateColumns: '72px auto auto',
            gap: 0,
            pl: 0,
            pb: 3,
            mb: 3,
            ml: 0,
            fontFamily:'Roboto Slab',
        //    border: '0px solid #ddd',
            borderBottom: '1px solid #e1e1e1',
            borderRadius: 0,
            backgroundColor: '#fff',
          }}
        >
          {/* Product Image */}
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: '90%',
              aspectRatio:'1/1',
              
              borderRadius: 2,
              objectFit: 'cover',
            }}
          />
        
          {/* Product Details*/}
          <Box sx={{ display: 'flex', flexDirection: 'column',
            pl:0, overflow: 'hidden', backgroundColor:'#fff' }}>
            {/* Title and Price Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 0.25,     
                backgroundColor: ''
              }}
            >
              {/* Title */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  fontSize: '0.9rem',
                  flex: 1,
                  fontFamily:'Roboto Slab',
                  marginRight: 1,
                  color: '#777777'
                }}
              >
                {item.name}
              </Typography>
        
            </Box>




            {/* Extra Info item.extraInfo */}
            {true && (
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: '#fff',
                  color: '#555',
                  fontSize: '0.75rem',
                  fontFamily:'Roboto Slab',
                  marginBottom: 2,

                }}
              >
                {item.extraInfo}
                $2.5/Lb
              </Typography>
            )}
        
            
          </Box>

              {/* Col3: Price Details */}
              <Box sx={{ textAlign: 'right',}}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.9rem',
                    pr: 1,
                    fontFamily:'Roboto Slab',
                  }}
                >
                  ${item.price * item.quantity}
                </Typography>
                {true && (
                  <Typography
                    sx={{
                      textDecoration: 'line-through',
                      fontSize: '0.85rem',
                      color: '#f77b72',
                      pr: 1,
                      fontFamily:'Roboto Slab',
                    }}
                  >
                    $24.99 {item.priceBeforeDiscount}
                  </Typography>
                )}
              </Box>


          {/* Action Row */}
          <Box
              sx={{
                display: 'flex',
                gridColumn: '2/4',
                gridRow: '3',
              //  width:'50%',
                justifyContent: 'right',
                alignItems: 'center',
                marginTop: 'auto',
                backgroundColor:'#fff'
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
                  mr:3,
                }}
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <Delete fontSize="vs" />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: '#999999', fontFamily:'Roboto Slab',
                    textDecoration: 'none', textTransform:'none' }}
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
                borderRadius: 5,
                border: '1px solid #e2e2e2',
                padding: '0 0px',
                width: '135px',
               // height: '30px',
                marginRight: 1,
              }}
              onClick={(e) => e.stopPropagation()}
              >
              <IconButton
                size="small"
                sx={{ color: '#727272'}}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart();
                }}
              >
                {item.quantity === 1 ? <Delete  fontSize="sm" sx={{ml:'3px'}}/> : <Remove />}
              </IconButton>
              <Typography sx={{ color: '#727272', fontSize: 16, fontWeight: 'bold', fontFamily:'Roboto Slab', }}>
                {item.quantity}
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
        





          
          // <Box
          //   key={item._id}
          //    sx={{ mb: 2, p: 1, 
          //     display: 'flex',
          //     flexDirection: 'row',  
          //     border: '1px solid #ddd', borderRadius: 2 }}
          // >
          //   <Box
          //     component="img"
          //     src={item.image}
          //     alt={item.name}
          //     sx={{
          //       width: '20%',
          //       objectFit: 'cover',
          //       borderRadius: 2,
          //       aspectRatio: '1 / 1.02',
          //     }}
          //   />

          //   <Box              
          //   sx={{ mb: 2, p: 1, 
          //     display: 'flex',
          //     width: '100%',
          //     flexDirection: 'column',  
          //     border: '1px solid #ddd', borderRadius: 2 }}> 
            
          //   <Typography variant="subtitle1" fontFamily='Roboto Slab'>
          //     {item.name}: {item.quantity}
          //   </Typography>
          //   <Typography variant="body2" fontFamily='Roboto Slab'>Price per unit: ${item.price}</Typography>
          //   <Typography variant="body2" fontFamily='Roboto Slab'>Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
          //   <Button
          //     variant="text"
          //     color="error"
          //     onClick={() => deleteFromCart(item._id)}
          //     sx={{ textTransform: 'none', textDecoration: 'underline', fontFamily:'Roboto Slab', mt: 1 }}
          //   >
          //     Remove
          //   </Button>
            
            
          //   </Box>


          // </Box>
        ))
      )}
    </Box>
    {/* Checkout */}
{(true) && (    <Box
  sx={{
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    alignContent:'center',
   // height: '150px',
    p: '15px 10px 30px 10px',
    borderTop: '2px solid yellow',
    backgroundColor: '#000',
  }}
>
  <Button
    sx={{
      backgroundColor: 'yellow',
      borderRadius: '30px',
      color: '#000',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      fontFamily: 'Roboto Slab',
      width: '100%',
      height: '50px',
      textTransform: 'none', // Prevent capitalization
      position: 'relative', // Relative positioning for internal elements
      display: 'flex',
      justifyContent: 'center', // Center the text
      alignItems: 'center', // Align text vertically
    }}
    onClick={() => {
      alert('Proceeding to checkout!');
    }}
  >
    Go to checkout
    <Box
      sx={{
        position: 'absolute',
        right: '16px', // Position from the right side
        backgroundColor: '#3f3f00',
        color: 'yellow',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        px: 2,
        py: 0.5,
        borderRadius: '20px',
      }}
    >
      ${calculateTotalPrice()}
    </Box>
  </Button>
</Box>)}

</Drawer>


      <Drawer anchor="left" open={isNavOpen} onClose={() => setNavOpen(false)}>
  <Box sx={{ width: 250, padding: 2, position: 'relative' }}>
    <IconButton
      onClick={() => setNavOpen(false)}
      sx={{
        borderRadius: 2,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>
    <List sx={{ paddingTop: 6 }}>
      {["Home", "Our Story", "Our Process", "Contact Us", "Halal Certifications", "FAQs"].map(
        (text) => (

          <ListItem button key={text} href='/'>
            <ListItemText primary={text} />
          </ListItem>
        )
      )}
    </List>
    <Button
              name='Login'
              variant="contained"
              href="/Login"            
              sx={{
                display: 'flex',
                bgcolor:"#4287f5",
                alignItems: 'center',
                borderRadius: 20, 
                padding: '8px 16px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 1,
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                Login
            </Button>
  </Box>
</Drawer>


    </ThemeProvider>
  );
}

export default FixedNavBarMui;
