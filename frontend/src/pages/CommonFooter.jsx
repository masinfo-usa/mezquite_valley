import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, YouTube } from '@mui/icons-material'; // MUI icons for social media

const links = [
  { text: "Home", href: "/" },
  { text: "Add Product", href: "/create" },
  { text: "Our Process", href: "/our-process" },
  { text: "Contact Us", href: "/contact-us" },
  { text: "Halal Certifications", href: "/halal-certifications" },
  { text: "FAQs", href: "/faqs" },
];

const CommonFooter = () => {
  return (
    <Box sx={{ backgroundColor: '#222', color: '#fff', padding: '20px 0' }}>
      {/* Quick Links Section */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: 2, justifyContent: 'center', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map((link, index) => (
            <Typography key={index} variant="body2" sx={{ margin: '0 10px' }}>
              <Link to={link.href} style={{ textDecoration: 'none', color: '#fff' }}>
                {link.text}
              </Link>
              {index < links.length - 1 && '  |'} {/* Add '|' separator except for the last link */}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Your Brand Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Your Brand
        </Typography>
      </Box>

      {/* Footer Info Section */}
      <Box sx={{ textAlign: 'center' }}>
        
        {/* Social Media Links */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" href="https://www.youtube.com" target="_blank">
            <YouTube />
          </IconButton>
        </Box>


        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          &copy; 2024 Grocery Store. All rights reserved.
        </Typography>

        {/* Privacy Policy Link */}
        <Typography variant="body2">
          <Link to="/privacy-policy" style={{ textDecoration: 'none', color: '#fff' }}>
            Privacy Policy
          </Link>
        </Typography>

        
      </Box>
    </Box>
  );
};

export default CommonFooter;
