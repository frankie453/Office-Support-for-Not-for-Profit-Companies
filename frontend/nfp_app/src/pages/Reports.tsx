import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReportGridIcon } from "../components/ReportGridIcon";
import { reportsExamples } from "../reports_examples";
import { useState } from "react";
import { ReportType } from "../types";
import { Dayjs } from "dayjs";
import { Link, NavLink } from "react-router";
import { ReportGenerator } from "../components/ReportGenerator";
import { getEmailReports } from '../services/reportService';
import { useMsal } from "@azure/msal-react";

type ReportFilter = {
  type: ReportType | string;
  start: Dayjs | null;
  end: Dayjs | null;
};

export default function ReportsPage() {
  const { instance } = useMsal();

  const [reportTypeFilter, setReportTypeFilter] = useState<ReportFilter>({
    type: "All",
    start: null,
    end: null,
  });

  const handleReportGenerated = async () => {
    await getEmailReports(instance);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3}}>
        Email Reports
      </Typography>

      <Stack alignItems={"center"} justifyContent={"center"}>
        <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            gap={5}
          >
            {/* <TextField fullWidth placeholder={"Search report..."}></TextField> */}
            <FormControl>
              <InputLabel id="select-report-type-label">Report Type</InputLabel>
              <Select
                id="select-report-type"
                labelId="select-report-type-label"
                label="Report Type"
                color="primary"
                defaultValue={"All"}
                value={reportTypeFilter.type}
                onChange={(event) =>
                  setReportTypeFilter({
                    ...reportTypeFilter,
                    type: event.target.value,
                  })
                }
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={ReportType.EMAILS}>Emails</MenuItem>
                <MenuItem value={ReportType.CALLS}>Phone Calls</MenuItem>
                <MenuItem value={ReportType.INPERSON}>In Person</MenuItem>
              </Select>
            </FormControl>
            <Stack direction={"row"} alignItems={"center"} gap={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={reportTypeFilter.start}
                  onChange={(value) =>
                    setReportTypeFilter({
                      ...reportTypeFilter,
                      start: value,
                    })
                  }
                  label={"From"}
                  views={["month", "year"]}
                />
                <Typography variant="h5">-</Typography>
                <DatePicker
                  value={reportTypeFilter.end}
                  onChange={(value) =>
                    setReportTypeFilter({
                      ...reportTypeFilter,
                      end: value,
                    })
                  }
                  label={"To"}
                  views={["month", "year"]}
                />
                  <ReportGenerator onReportGenerated={handleReportGenerated} />
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Stack>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Grid2
          container
          columns={4}
          spacing={4}
          // justifyContent="space-evenly"
          width={"100%"}
        >
          {reportsExamples
            .filter((report) => {
              if (
                reportTypeFilter.type !== "All" &&
                reportTypeFilter.type !== report.metadata.type
              )
                return false;
              else if (
                reportTypeFilter.start &&
                reportTypeFilter.start.toDate() > report.metadata.date
              )
                return false;
              else if (
                reportTypeFilter.end &&
                reportTypeFilter.end.toDate() < report.metadata.date
              )
                return false;
              else {
                return true;
              }
            })
            .map((report) => (
              <Grid2 size={1}>
                <ReportGridIcon report={report} />
              </Grid2>
            ))}
        </Grid2>
      </Stack>
    </Box>
  );
}
