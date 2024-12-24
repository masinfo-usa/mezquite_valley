import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Container,
  InputAdornment
} from '@mui/material';

// Assuming USCities is imported and available like in the previous example
import USCities from '../datafiles/OptimizedUSCities.json'; // Adjust the path as necessary

const countries = ['United States', 'Canada', 'Mexico']; // Add more countries if needed

const AddressForm = () => {
  // Get today's date and tomorrow's date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Format the dates as 'YYYY-MM-DD'
  const formattedToday = today.toISOString().split('T')[0];
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phoneNumber: '',
    address: '',
    country: 'United States',
    zipCode: '',
    state: '',
    city: '',
    roomNumber: '',
    checkInDate: formattedToday, // Set default check-in date to today
    checkOutDate: formattedTomorrow, // Set default check-out date to tomorrow
    rate: '', // For the rate field
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // No address suggestions on address input
    if (name === 'address') {
      setAddressSuggestions([]); // Clear address suggestions
    }
  };

  const handleZipCodeBlur = () => {
    const { zipCode } = formData;

    if (zipCode.length === 5) {
      // Look up ZIP code in USCities data
      const match = USCities.find((city) => city.zip_code.toString() === zipCode);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          city: match.city,
          state: match.state,
        }));
      } else {
        setFormData((prev) => ({ ...prev, city: '', state: '' }));
      }
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    // Simulate autofilling from address suggestion
    setFormData({
      ...formData,
      address: suggestion,
      state: 'Mock State',
      city: 'Mock City',
      zipCode: '00000',
    });
    setAddressSuggestions([]);
  };

  const handleSearchGuest = () => {
    // Search guest logic
    console.log('Searching for guest with:', formData);
  };

  const handleCreateReservation = () => {
    // Create reservation logic
    console.log('Creating reservation with:', formData);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Address Form
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              type="number"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              inputProps={{
                pattern: '[0-9]*',
                inputMode: 'numeric',
                style: { MozAppearance: 'textfield' },
              }}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              select
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="Zip/Postal Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              onBlur={handleZipCodeBlur} // Trigger lookup when user leaves the input field
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="City/Town"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              type="date"
              label="Check-In Date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              type="date"
              label="Check-Out Date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              type="number"
              label="Room Number"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleInputChange}
              inputProps={{
                pattern: '[0-9]*',
                inputMode: 'numeric',
                style: { MozAppearance: 'textfield' },
              }}
            />
          </Box>

          {/* Rate field with $ sign */}
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <TextField
              fullWidth
              label="Rate"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: {
                  pattern: '[0-9.]*',
                  inputMode: 'decimal', // Allow decimal numbers
                },
              }}
            />
          </Box>

          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearchGuest}
            >
              Find Guest
            </Button>
          </Box>
          <Box flexBasis={{ xs: '100%', sm: '48%' }}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleCreateReservation}
            >
              Create Reservation
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AddressForm;
