// styles/theme.ts

import { createTheme, makeStyles } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      light: '#ffff8e',
      main: '#e9f65b',
      dark: '#b4c323',
      contrastText: '#000000',
    },
    secondary: {
      dark: '#000000',
      main: '#000000', // omitting light and dark will calculate from main
      contrastText: '#ffffff',
    },
    grey: {
      '500': '##f7f9fa',
      '700': '#79797a',
    },
    info: {
      main: '#e9f65b',
    },
    success: {
      main: '#e9f65b',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  components: {
    // Name of the component
    MuiListItemButton: {
      styleOverrides: {
        // Name of the slot
        root:{
          "&.Mui-selected": {
            // Some CSS
            backgroundColor: '#000',
            color:'#fff',
            "&:Hover":{
              backgroundColor: '#e9f65b'
            }
          },
        }
       
      },
    },
  },
});

export default theme;