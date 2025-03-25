import { 
    Box, 
    Button, 
    Stack, 
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
  } from "@mui/material";
  import { DatePicker } from "@mui/x-date-pickers";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { useState } from "react";
  import { generateMonthlyReport } from "../services/reportService";
  import { useMsal } from "@azure/msal-react";
  import dayjs, { Dayjs } from "dayjs";
  
  type DateRange = {
    start: Dayjs | null;
    end: Dayjs | null;
  };
  
  export function ReportGenerator({ onReportGenerated }: { onReportGenerated: () => void }) {
    const { instance } = useMsal();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
    const [mode, setMode] = useState<'month' | 'custom'>('month');
  
    const handleGenerate = async () => {
      try {
        setLoading(true);
        setError(null);
  
        if (mode === 'custom' && (!dateRange.start || !dateRange.end)) {
          setError('Please select both start and end dates');
          return;
        }
  
        await generateMonthlyReport(instance, {
          mode,
          dateRange: mode === 'custom' ? {
            start: dateRange.start?.toDate() || null,
            end: dateRange.end?.toDate() || null
          } : undefined
        });
        
        setOpen(false);
        onReportGenerated();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate report');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Generate New Report
        </Button>
  
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Generate Email Report</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
              <FormLabel component="legend">Report Period</FormLabel>
              <RadioGroup
                value={mode}
                onChange={(e) => setMode(e.target.value as 'month' | 'custom')}
              >
                <FormControlLabel 
                  value="month" 
                  control={<Radio />} 
                  label="Current Month" 
                />
                <FormControlLabel 
                  value="custom" 
                  control={<Radio />} 
                  label="Custom Date Range" 
                />
              </RadioGroup>
            </FormControl>
  
            {mode === 'custom' && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <DatePicker
                    label="Start Date"
                    value={dateRange.start}
                    onChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                    disabled={loading}
                  />
                  <DatePicker
                    label="End Date"
                    value={dateRange.end}
                    onChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                    disabled={loading || !dateRange.start}
                    minDate={dateRange.start || undefined}
                  />
                </Stack>
              </LocalizationProvider>
            )}
  
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={handleGenerate}
              disabled={loading || (mode === 'custom' && (!dateRange.start || !dateRange.end))}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }