import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,    // Mobile
      sm: 640,  // Tablet
      md: 900,  // Default MUI breakpoint (not used)
      lg: 1200, // Desktop
      xl: 1536  // Default MUI breakpoint (not used)
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default theme; 