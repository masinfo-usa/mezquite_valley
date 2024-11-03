import {Box, HStack, Link, useBreakpointValue, useColorModeValue} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import Navbar from "./components/Navbar"
import TestPage from "./pages/TestPage"



function App() {

  const isMediumScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box minH={"100vh"} px={0} bg={useColorModeValue("gray.100", "gray.900")}>
        <TestPage />
        <Box bg="gray.200" width="100%" paddingTop={65}>
        <HStack justify="center" spacing={8} height={10} display={isMediumScreen ? "none" : "flex"}>
          <Link href="#home">Home</Link>
          <Link href="#our-story">Our Story</Link>
          <Link href="#our-process">Our Process</Link>
          <Link href="#contact-us">Contact Us</Link>
          <Link href="#halal-certifications">Halal Certifications</Link>
          <Link href="#faqs">FAQs</Link>
          <Link href="#faqs">TestPage</Link>
          </HStack>
      </Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/testpage" element={<TestPage />} />
        </Routes>
      </Box>


    </>
  )
}

export default App
