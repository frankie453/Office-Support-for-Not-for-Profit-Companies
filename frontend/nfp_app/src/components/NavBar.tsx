import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
  Box,
} from '@mui/material';
import {
  Home as HomeIcon,
  Download as DownloadIcon,
  CheckBox as CheckBoxIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 80; // Sidebar width

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#f9f5ff', // Sidebar background color
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
        },
      }}
    >
      {/* Add Button at the top */}
      <Box sx={{ mb: 2 }}>
        <Tooltip title="New Form" placement="right">
          <ListItemButton
            onClick={() => navigate('/form')}
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              justifyContent: 'center',
              bgcolor: 'primary.light',
              '&:hover': {
                bgcolor: 'primary.main',
              },
            }}
          >
            <AddIcon sx={{ color: 'white' }} />
          </ListItemButton>
        </Tooltip>
      </Box>

      <Divider sx={{ width: '80%', my: 2 }} />

      {/* Navigation Items */}
      <List sx={{ width: '100%' }}>
        <ListItem disablePadding>
          <Tooltip title="Dashboard" placement="right">
            <ListItemButton
              component={Link}
              to="/"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <HomeIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Reports" placement="right">
            <ListItemButton
              component={Link}
              to="/reports"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <DownloadIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Tasks" placement="right">
            <ListItemButton
              component={Link}
              to="/tasks"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <CheckBoxIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Categories" placement="right">
            <ListItemButton
              component={Link}
              to="/categories"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <CalendarIcon />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Drawer>
  );
}
