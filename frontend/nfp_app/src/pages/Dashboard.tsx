import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Stack,
  Grid,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { reportsExamples } from '../reports_examples';
import { useNavigate } from 'react-router-dom';
import { ReportGridIcon } from '../components/ReportGridIcon';

export default function DashboardPage() {
  const navigate = useNavigate();

  const sortedReports = [...reportsExamples].sort((a, b) => 
    b.metadata.date.getTime() - a.metadata.date.getTime()
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* Recent Reports Section */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5">Recent Reports</Typography>
          <IconButton onClick={() => navigate('/reports')}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Grid container spacing={3}>
          {sortedReports.slice(0, 4).map((report) => (
            <Grid item xs={12} sm={6} md={3} key={report.metadata.id}>
              <ReportGridIcon report={report} />
            </Grid>
          ))}
        </Grid>
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