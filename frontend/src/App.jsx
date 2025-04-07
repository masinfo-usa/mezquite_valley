import React, {useEffect} from "react";
import { Box, Link, Stack } from "@mui/material";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import FixedNavBar from "./pages/FixedNavBar";
import CommonFooter from "./pages/CommonFooter";
import Login from "./pages/Login";
import AddressForm from "./pages/ReservationForm";
//import AddressForm from "./pages/Test";
import { useMediaQuery, useTheme } from '@mui/material';
import { useProductStore } from './store/product';



function App() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // Returns true if screen width is less than 'md'


  const updateAspectRatio = useProductStore((state) => state.updateAspectRatio);

  useEffect(() => {
    const handleResize = () => {
      updateAspectRatio();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateAspectRatio]);


//"#f7f5f0"
  return (
      <Box px={0} sx={{backgroundColor:'#fff'}}>
        <FixedNavBar />
        <Box sx={{backgroundColor:"#222", justifyItems:'center'}} width="100%" paddingTop={'70px'}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            spacing={''}
            height={30}
            display={isMediumScreen ? "none" : "flex"}
            width="80%"
          >
            <Link href="/" color='#fff' underline="none">Home</Link>
            <Link href="/create" color='#fff' underline="none">Add Product</Link>
            <Link href="#our-process" color='#fff' underline="none">Our Process</Link>
            <Link href="#contact-us" color='#fff' underline="none">Contact Us</Link>
            <Link href="#halal-certifications" color='#fff' underline="none">Halal Certifications</Link>
            <Link href="#faqs" color='#fff' underline="none">FAQs</Link>
            <Link href="/testpage" color='#fff' underline="none">TestPage</Link>
          </Stack>
        </Box>

        {/* Define Routes for the pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/testpage" element={<AddressForm />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <CommonFooter />
        
      </Box>
  );
}

export default App;
