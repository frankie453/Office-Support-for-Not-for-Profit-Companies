import React from 'react';
import { Outlet } from 'react-router-dom'; // For routing
import Navbar from './NavBar';
import { Box, Container } from '@mui/material';

export default function Layout() {
  const drawerWidth = 80; // Match NavBar width

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 4,
            px: 3,
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
