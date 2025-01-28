import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Download as DownloadIcon,
  CheckBox as CheckBoxIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 80; // Sidebar width

export default function Navbar() {
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
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <Tooltip title="Dashboard" placement="right">
            <ListItemButton
              component={Link}
              to="/"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Downloads" placement="right">
            <ListItemButton
              component={Link}
              to="/downloads"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon>
                <DownloadIcon sx={{ color: 'primary.main' }} />
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
              <ListItemIcon>
                <CheckBoxIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <ListItem disablePadding>
          <Tooltip title="Calendar" placement="right">
            <ListItemButton
              component={Link}
              to="/calendar"
              sx={{ justifyContent: 'center' }}
            >
              <ListItemIcon>
                <CalendarIcon sx={{ color: 'primary.main' }} />
              </ListItemIcon>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
}
