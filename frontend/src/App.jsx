import React from "react";
import { Box, Link, Stack } from "@mui/material";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import AAA_1 from "./pages/AAA_1";
import FixedNavBar from "./pages/FixedNavBar";
import FixedNavBarMui from "./pages/FixedNavBarMui";
import Login from "./pages/Login";
import { useMediaQuery, useTheme } from '@mui/material';

function App() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // Returns true if screen width is less than 'md'

  return (
      <Box px={0}>
        <FixedNavBarMui />
        <Box bg="#f7f5f0" width="100%" paddingTop={'72px'}>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={8}
            height={10}
            display={isMediumScreen ? "none" : "flex"}
          >
            <Link href="/" underline="none">Home</Link>
            <Link href="/create" underline="none">Our Story</Link>
            <Link href="/AAA_1" underline="none">Our Process</Link>
            <Link href="#contact-us" underline="none">Contact Us</Link>
            <Link href="#halal-certifications" underline="none">Halal Certifications</Link>
            <Link href="#faqs" underline="none">FAQs</Link>
            <Link href="#faqs" underline="none">TestPage</Link>
          </Stack>
        </Box>

        {/* Define Routes for the pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/AAA_1" element={<AAA_1 />} />
          <Route path="/testpage" element={<FixedNavBar />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Box>
  );
}

export default App;
