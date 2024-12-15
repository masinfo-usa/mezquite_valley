import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../components/ProductCard";

const SuggestedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the start index of the visible items
  const itemsPerPage = 5; // Number of items visible at once

  // Compute the slice of products to show
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  // Handlers for navigation buttons
  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", position: "relative", padding: "1rem" }}>
      {/* Title */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Suggested Products
      </Typography>

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrev}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "yellow",
          color: '#000',
          border: '1px solid #000',
          boxShadow: 1,
          "&:disabled": {
            opacity: 0.5,
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= products.length}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "yellow",
          color: '#000',
          border: '1px solid #000',
          boxShadow: 1,
          "&:disabled": {
            opacity: 0.5,
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`, // Fixed 5 columns
          gap: 10,
          width: "100%",
          px: '5%'
        }}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard product={product} />
          
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedProducts;
