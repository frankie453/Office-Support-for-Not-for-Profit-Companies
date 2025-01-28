import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Stack,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { reportsExamples } from '../reports_examples';

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* Recent Reports Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">Recent Reports</Typography>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2 }}>
          {reportsExamples.slice(0, 7).map((report, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 2,
                minWidth: 120,
                textAlign: 'center',
                borderRadius: '50%',
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography>Label</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Recent Emails Section */}
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">Recent Emails</Typography>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <List>
          {[1, 2, 3, 4].map((item) => (
            <ListItem key={item} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Subject | Description"
                sx={{ color: 'text.primary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}