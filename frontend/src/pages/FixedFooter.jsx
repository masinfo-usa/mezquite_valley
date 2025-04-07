import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';

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
    <Box sx={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', textAlign: 'center' }}>
      <Grid container spacing={3} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Quick Links Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Quick Links
          </Typography>
          <Box>
            {links.map((link, index) => (
              <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                <Link to={link.href} style={{ textDecoration: 'none', color: '#fff' }}>
                  {link.text}
                </Link>
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Footer Info Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            &copy; 2024 Grocery Store. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Follow us on social media
          </Typography>
          <Box>
            {/* Add social media icons here */}
          </Box>
        </Grid>

        {/* Additional Section (if any) */}
        <Grid item xs={12} sm={4}>
          {/* You can add more content or links here */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommonFooter;
