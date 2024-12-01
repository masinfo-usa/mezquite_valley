import {Box, HStack, Link, useBreakpointValue, useColorModeValue} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import AAA_1 from "./pages/AAA_1"
import FixedNavBar from "./pages/FixedNavBar"



function App() {

  const isMediumScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Box minH={"100vh"} px={0} bg={useColorModeValue("white", "gray.900")}>
        <FixedNavBar />
        <Box bg="#f7f5f0" width="100%" paddingTop={'72px'}>
        <HStack justify="center" spacing={8} height={10} display={isMediumScreen ? "none" : "flex"}>
          <Link href="/">Home</Link>
          <Link href="/create">Our Story</Link>
          <Link href="/AAA_1">Our Process</Link>
          <Link href="#contact-us">Contact Us</Link>
          <Link href="#halal-certifications">Halal Certifications</Link>
          <Link href="#faqs">FAQs</Link>
          <Link href="#faqs">TestPage</Link>
          </HStack>
      </Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/testpage" element={<FixedNavBar />} />
          <Route path="/AAA_1" element={<AAA_1 />} />
        </Routes>
      </Box>


    </>
  )
}

export default App
