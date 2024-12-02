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
      <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: theme.zIndex.drawer - 1, boxShadow: 'none', 
               }}>
        <Toolbar sx={{ backgroundColor: "#f7f5f0", borderBottom: "1px solid #dfdbce", boxShadow: 'none' }}>
          {isMediumScreen && !isSearchFocused && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setNavOpen(true)}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {!(isMediumScreen && isSearchFocused) && (
            <Typography variant="h6" fontWeight={'bold'} color="#000000" noWrap component="a" href="/" sx={{ flexGrow: 1 }}>
              Your Brand
            </Typography>
          )}

          <Box sx={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center" }}>
            <SearchIcon sx={{ position: "absolute", marginLeft: 2, color: "gray.400" }} />
            <InputBase
              placeholder={placeholders[placeholderIndex]}
              value={searchText}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: 50,
                padding: "6px 10px 6px 40px",
                flex: 1,
                borderWidth:1,
                borderColor: '#000000'
              }}
            />
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

          {!(isSearchFocused && isMediumScreen) && (
            <Button
            variant="contained"
            
href="/Login"            sx={{
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
            variant="contained"
            color="primary"
            onClick={() => setCartOpen(true)}
            sx={{
              display: 'flex',
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
              <ShoppingCartIcon sx={{ marginRight: 0 }} />
              {cartItemCount}
          </Button>
          )}

          </Box>

        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isCartOpen} onClose={() => setCartOpen(false)}
        SlideProps={{
          timeout: {
            enter: 100, 
            exit: 100,  
          },
        }}
        
        >
        <Box sx={{ width: 300, padding: 2 }}>
          <IconButton onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <Typography variant="body1">Cart items go here...</Typography>
        </Box>
      </Drawer>

      <Drawer anchor="left" open={isNavOpen} onClose={() => setNavOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          <IconButton onClick={() => setNavOpen(false)}>
            <CloseIcon />
          </IconButton>
          <List>
            {["Home", "Our Story", "Our Process", "Contact Us", "Halal Certifications", "FAQs"].map(
              (text) => (
                <ListItem button key={text} onClick={() => setNavOpen(false)}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

export default FixedNavBarMui;
