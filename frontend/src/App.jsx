import React, {useEffect} from "react";
import { Box, Stack } from "@mui/material";
import { Link, Route, Routes, HashRouter as Router } from "react-router-dom";
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


        {/* <Box sx={{backgroundColor:"#222", justifyItems:'center'}} width="100%" paddingTop={'70px'}>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            spacing={''}
            height={30}
            display={isMediumScreen ? "none" : "flex"}
            width="80%"
          >
           <Link to="/mezquite_valley/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
            <Link to="/mezquite_valley/create" style={{ color: "#fff", textDecoration: "none" }}>Add Product</Link>
            <a href="#our-process" style={{ color: "#fff", textDecoration: "none" }}>Our Process</a>
            <a href="#contact-us" style={{ color: "#fff", textDecoration: "none" }}>Contact Us</a>
            <a href="#halal-certifications" style={{ color: "#fff", textDecoration: "none" }}>Halal Certifications</a>
            <a href="#faqs" style={{ color: "#fff", textDecoration: "none" }}>FAQs</a>
            <Link to="/mezquite_valley/testpage" style={{ color: "#fff", textDecoration: "none" }}>TestPage</Link>
          </Stack>
        </Box> */}

        {/* Define Routes for the pages */}
        
        <Routes>
          <Route path="/mezquite_valley/" element={<HomePage />} />
          <Route path="/mezquite_valley/create" element={<CreatePage />} />
          <Route path="/mezquite_valley/testpage" element={<AddressForm />} />
          <Route path="/mezquite_valley/Login" element={<Login />} />
        </Routes>
        <CommonFooter />
        
      </Box>
  );
}

export default App;
