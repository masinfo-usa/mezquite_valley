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
  Link,
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProductStore } from "../store/product";
import ProductPanel from "../components/ProductPanel";
import ProductDetailsModal from '../components/ProductDetailsModal';
import FullImageModal from '../components/FullImageModal';






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

const links = [
  { text: "Home", href: "/" },
  { text: "Add Product", href: "/create" },
  { text: "Our Process", href: "/our-process" },
  { text: "Contact Us", href: "/contact-us" },
  { text: "Halal Certifications", href: "/halal-certifications" },
  { text: "FAQs", href: "/faqs" },
  { text: "Test Page", href: "/testpage" },
];


function FixedNavBar() {
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
        
        sx={{ backgroundColor: '#222',//"#f7f5f0",  
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


      <ProductDetailsModal />


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
          name="cartheader"
          sx={{
            display: 'grid',
            gridTemplateColumns: '72px 0.9fr',
            gap: 0,
            pt: 2,
            pb: 2,
            mb: 1,
            ml: 0,
            width:'100%',

            backgroundColor: '#fff',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            alignItems: 'center',
            padding: 0.0,
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
    gridColumn: '1',
    gridRow: '1',
    mt: 1,
    mb: 1,
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
        backgroundColor: '#fff',
        color: '#000',
        mr: '10%',
        width: '100%',
        mt: '3px',
        mb: '0',
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily:'Roboto Slab',
        gridColumn: '2',
        gridRow: '1',
        
      }}
    >
    Your Cart
    </Typography>

    {/* <Typography
      sx={{
        gridColumn: '2',
        gridRow: '2',
        color: '#a2a2a2',
        mr: '10%',
        width: '100%',
        mt: '0px',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: '0.8rem',
        fontFamily:'Roboto Slab'
      }}
    >
    Free delivery on order above $35
    </Typography> */}

  </Box>




    {/* Selected Product Modal */}
         
    
     




    {/* Cart Items */}
    
    <Box sx={{ pl: 1, flexGrow: 1, overflowY: 'auto', backgroundColor: '#fff'}}>
      <Typography variant="h6" fontFamily='Roboto Slab' gutterBottom>
        Cart Items
      </Typography>
      {cartItems.length === 0 ? (
        <Typography fontFamily='Roboto Slab' align={'center'}>No items in the cart.</Typography>
      ) : (
        cartItems.map((item) => (
          <ProductPanel key={item._id} product={item} />
        ))
      )}
    </Box>
    {/* Checkout */}
{(cartItems.length !== 0) && (    <Box
  sx={{
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    alignContent:'center',
   // height: '150px',
    p: '10px 10px 30px 10px',
    borderTop: '2px solid yellow',
    backgroundColor: '#222',
  }}
>


<Typography
      sx={{
         color: '#a2a2a2',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: '0.8rem',
        fontFamily:'Roboto Slab',
        mb: 0.5,
      }}
    >
    Free delivery on order above $35
    </Typography>


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

<Drawer
  anchor="left"
  open={isNavOpen}
  onClose={() => setNavOpen(false)}
  SlideProps={{
    timeout: {
      enter: 100,
      exit: 100,
    },
    
  }}
  sx={{
    '& .MuiDrawer-paper': {
      width: '65%'
    },
  }}
>
  <Box sx={{ width: '100%', padding: 2, position: 'relative' }}>
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


    <Box
          sx={{
            display: 'grid',
          //  gridAutoFlow: 'row',
//            gridTemplateColumns: `repeat(${aspectRatio * 2}, 1fr)`,
            gridTemplateRows: `repeat(auto-fill, minmax(10%, 1fr))`,
            
            rowGap: `${1 * 1}vh`,
            width: '100%',
            mt: '5vh',
            mb: '15%',
            
            justifyContent:'flex-start',
            fontFamily: 'Roboto Slab',
            backgroundColor: '#fff',
          }}
        >



{links.map(({ text, href }) => (
  <Link
    key={text}
    href={href}
    sx={{
      width: '250px',
      pt: '10px',
      pb: '10px',
      pl: '10px',
      textAlign: 'left',
      justifyContent: 'center',
      textDecoration: 'none',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#f2f2f2', // Remove shadow on hover
      },
    }}
  >
    {text}
  </Link>
))}


      </Box>

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

export default FixedNavBar;
