import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Grid,
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { reportsExamples } from '../reports_examples';
import { useNavigate } from 'react-router-dom';
import { ReportGridIcon } from '../components/ReportGridIcon';
import EmailView from '../components/EmailView';

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
          <IconButton onClick={() => navigate('/categories')}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
          <EmailView limit={10} onEmailCountChange={() => {}} />
        </Box>
      </Box>
    </Box>
  );
}