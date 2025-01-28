import React from 'react';
import { Outlet } from 'react-router-dom'; // For routing
import Navbar from './NavBar';
import { Box } from '@mui/material';

export default function Layout() {
  const drawerWidth = 80; // Match NavBar width

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          ml: `${drawerWidth}px`,
          backgroundColor: '#f5f5f5' // Light grey background
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
