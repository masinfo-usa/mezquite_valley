import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import Login from "./pages/Login"

const theme = createTheme({
  palette: {
    primary: {
      main: '#108910', // Green color for primary
    },
    secondary: {
      main: '#f7f5f0', // Beige color for secondary
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, Arial, sans-serif',
  //  fontSize: 'clamp(0.85rem, 2vw, 1.0rem)',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <App />
      </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
)
