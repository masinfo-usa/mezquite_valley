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
      backgroundColor: '#000',
      display: 'flex',
      position: 'sticky',
    top: 0,
    zIndex: 10,
    alignItems: 'center',
      padding: 0.5,
      borderBottom: '2px solid yellow',
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
    color: 'yellow',
    '&:hover': {
      color: '', // Color when hovered
      backgroundColor: 'rgba(100, 100, 100, 0.99)', // Optional: background color on hover
    },
    '&:active': {
      color: '', // Color when clicked/pressed
      backgroundColor: 'rgba(100, 100, 100, 0.99)', // Optional: background color when pressed
    },
  }}
>
  <CloseIcon />
</IconButton>

    <Typography
      variant="h6"
      gutterBottom
      sx={{
        color: 'yellow',
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
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr auto',
            gap: 2,
            pl: 0,
            pb: 3,
            mb: 3,
        //    border: '0px solid #ddd',
            borderBottom: '1px solid #ddd',
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
              width: 80,
              height: 80,
              borderRadius: 2,
              objectFit: 'cover',
            }}
          />
        
          {/* Product Details and Price */}
          <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Title and Price Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 1,
              }}
            >
              {/* Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'normal',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  fontSize: '0.8rem',
                  flex: 1,
                  marginRight: 1,
                }}
              >
                {item.name}
              </Typography>
        
              {/* Price Details */}
              <Box sx={{ textAlign: 'right', minWidth: '80px' }}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '0.9rem',
                  }}
                >
                  ${item.price}
                </Typography>
                {item.priceBeforeDiscount && (
                  <Typography
                    sx={{
                      textDecoration: 'line-through',
                      fontSize: '0.85rem',
                      color: '#888',
                    }}
                  >
                    ${item.priceBeforeDiscount}
                  </Typography>
                )}
              </Box>
            </Box>
        
            {/* Extra Info item.extraInfo */}
            {true && (
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontSize: '0.85rem',
                  marginBottom: 1,
                }}
              >
                {item.extraInfo}
                $2.5/Lb
              </Typography>
            )}
        
            {/* Action Row */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
              }}
            >
              {/* Remove Button */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.0,
                  cursor: 'pointer',
                  color: '#727272',
                  textDecoration: 'underline',
                }}
                onClick={() => handleRemoveFromCart(item._id)}
              >
                <Delete fontSize="vs" />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: '#727272', textDecoration: 'underline' }}
                >
                  Remove
                </Typography>
              </Box>
        
              {/* Quantity Adjuster */}
              <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      color: 'yellow',
      borderRadius: 2,
      border: '1px solid #000',
      padding: '0 0px',
      width: 110,
      height: 30,
      marginRight: 2,
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <IconButton
      size="small"
      sx={{ color: '#000'}}
      onClick={(e) => {
        e.stopPropagation();
        handleRemoveFromCart();
      }}
    >
      {item.quantity === 1 ? <Delete /> : <Remove />}
    </IconButton>
    <Typography sx={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
      {item.quantity}
    </Typography>
    <IconButton
      size="small"
      sx={{ color: '#000' }}
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
