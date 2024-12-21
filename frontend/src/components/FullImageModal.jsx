import React from 'react';
import { Dialog, IconButton, Box } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const FullImageModal = ({ open, onClose, imageSrc, imageAlt }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <Dialog
      open={open}
      onClose={onClose}
     // fullScreen
     PaperProps={{
        style: {
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: isMobile ? '0' : '16px',
          maxWidth: isMobile ? '100%' : '80%',
          maxHeight: isMobile ? '100%' : '85%',
          margin: 'auto',
          
        },
      }}

     

    >
      <Box
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
        }}
      >
        <IconButton onClick={onClose} style={{ color: "#000" }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <TransformWrapper
        initialScale={isMobile ? 1 : 0.5} // Start at 50% scale
        initialPositionX={0} // Center horizontally
        initialPositionY={0} // Center vertically
        maxScale={2}         // Allow zooming up to 200% scale
     //   minScale={0.5}       // Minimum scale (50% of original)
        centerOnInit={true}  // Center the image initially
        doubleClick={{
          step: 1,         // Amount to zoom in/out on double click or tap
          mode: "toggle",    // Alternates between zoom-in and zoom-out
        }}
      >
        <TransformComponent>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: isMobile ? '100vw' : "80vw",   // Make the image scale to the full viewport width
              height: isMobile ? '100vh' : "85vh",  // Make the image scale to the full viewport height
              objectFit: "contain",  // Maintain aspect ratio while scaling
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </Dialog>
  );
};

export default FullImageModal;
