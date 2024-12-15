import React from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

const SuggestedProductsMobile = ({ products }) => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", padding: "1rem" }}>
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Suggested Products
      </Typography>

      {/* Horizontal Scrollable Grid */}
      <Box
  sx={{
    display: "grid",
    gridAutoFlow: "column", // Arrange items in a single horizontal row
    gridAutoColumns: "35%", // Each item explicitly takes up 40% of the width
    columnGap: '5%', // Spacing between items
    overflowX: "auto", // Enable horizontal scrolling
    scrollSnapType: "x mandatory", // Snap to grid items while scrolling
    "&::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for a cleaner look
    },
  }}
>
  {products.map((product, index) => (
    
    <ProductCard product={product} />
  ))}
</Box>

    </Box>
  );
};

export default SuggestedProductsMobile;
