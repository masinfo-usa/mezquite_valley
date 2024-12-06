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
                onBlur={() => setIsSearchFocused(false)}
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
                  onClick={() => {
                    setIsSearchFocused(false);
                    setSearchText("");
                  }}
                  sx={{ marginLeft: 1 }}
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
                backgroundColor: 'yellow',
                borderRadius: 20, 
                padding: '8px 16px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 1,
                color:'#000',
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                <ShoppingCartIcon sx={{ marginRight: 0, color:'#000' }} />
                {cartItemCount}
            </Button>
            )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isCartOpen} onClose={() => setCartOpen(false)}
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
         <Box name='cart_header' 
         sx={{           
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',  // Center elements vertically
          padding: 1.2,
          borderBottom: '1px solid #eeeeee',}}>
            <IconButton onClick={() => setCartOpen(false)}
              sx={{
                borderRadius: 2,
                zIndex: 1,
                width: '45px',
                height: '45px',
                justifySelf: 'center',
               }}
              >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom 
            sx={{ backgroundColor:'#fff', //'red', 
              mr:'10%', width:'100%', 
              mt: '10px',
              textAlign: 'center', fontWeight:'bold' }}>
              Your Cart
            </Typography>

          </Box>


       <Box sx={{           
          backgroundColor: '#fff',//'#f1f1f1',
          width: {
            
          }, 
          height: "100%",
          padding: 2 }}>
          
          <Typography variant="body1" sx={{ textAlign: 'center' }}>Cart items go here...</Typography>
        </Box>
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
          <ListItem button key={text} onClick={() => setNavOpen(false)}>
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
