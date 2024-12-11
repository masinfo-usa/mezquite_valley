import React from 'react';
import { Box } from '@mui/material';

const Test = () => {

  return (
    <Box
    sx={{
      display: 'grid',
      m:0,
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 5,
    }}
  >

<div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
    <div style={{
      // gridColumn: '2', // Target only the third column
      // gridRow: '2', // Place it on the second row
      background: '#ccc',
    }}>Item 4</div>
    <div style={{
      gridColumn: '2', // Target only the third column
      gridRow: '2', // Place it on the second row
      background: '#ccc',
    }}>Item 5</div>
    <div style={{
       gridColumn: '2/4', // Target only the third column
       gridRow: '2', // Place it on the second row
      background: '#ccc',
    }}>Item 6</div>
      </Box>
  
  );
};



export default Test;
