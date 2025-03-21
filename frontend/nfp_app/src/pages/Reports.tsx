import {
  Alert,
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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReportGridIcon } from "../components/ReportGridIcon";
import { reportsExamples } from "../reports_examples";
import { useEffect, useState } from "react";
import { ReportType, Report } from "../types";
import { Dayjs } from "dayjs";
import { Link, NavLink } from "react-router";
import axios from "axios";
import { BASE_URL } from "../constants";

type ReportFilter = {
  type: ReportType | string;
  start: Dayjs | null;
  end: Dayjs | null;
};

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export default function ReportsPage() {
  const [reportTypeFilter, setReportTypeFilter] = useState<ReportFilter>({
    type: "All",
    start: null,
    end: null,
  });
  const [error, setError] = useState(null);
  const [reports, setReports] = useState<Report[]>([]);
  const getCallsData = (date: Date, forms: any[]) => {
    const total: number = forms.length;
    const byDay: number[] = Array(daysInMonth(date)).fill(0);
    const byIssue: { label: string; value: number }[] = [];
    const byEmployee: { label: string; value: number }[] = [];
    for (let i = 0; i < forms.length; i++) {
      const form_date = new Date(forms[i].date.replace("-", "/"));
      console.log(form_date.getDate() - 1);
      byDay[form_date.getDate() - 1] = byDay[form_date.getDate() - 1] + 1;
      const issueIndex = byIssue.findIndex(
        (entry) => entry.label === forms[i].issue.toUpperCase()
      );
      if (issueIndex === -1)
        byIssue.push({ label: forms[i].issue.toUpperCase(), value: 1 });
      else
        byIssue[issueIndex] = {
          label: forms[i].issue.toUpperCase(),
          value: byIssue[issueIndex].value + 1,
        };
      const employeeIndex = byEmployee.findIndex(
        (entry) => entry.label === forms[i].callTransferredTo.toUpperCase()
      );
      if (employeeIndex === -1)
        byEmployee.push({
          label: forms[i].callTransferredTo.toUpperCase(),
          value: 1,
        });
      else
        byEmployee[employeeIndex] = {
          label: forms[i].callTransferredTo.toUpperCase(),
          value: byEmployee[employeeIndex].value + 1,
        };
      console.log({
        total: total,
        byDay: byDay,
        byIssue: byIssue,
        byEmployee: byEmployee,
      });
    }
    return {
      total: total,
      byDay: byDay,
      byIssue: byIssue,
      byEmployee: byEmployee,
    };
  };
  useEffect(() => {
    axios
      .get(BASE_URL + "api/reports/calls/")
      .then((res) => {
        const data = res.data;
        const calls_reports: Report[] = data.map((entry: any) => {
          const report_date = new Date(
            entry.starting_month_year.replace("-", "/")
          );
          return {
            metadata: {
              id: Number(entry.id),
              date: report_date,
              type: ReportType.CALLS,
            },
            content: getCallsData(report_date, entry.forms),
          };
        });
        setReports(calls_reports);
        console.log(calls_reports);
      })

      .catch((er) => {
        setError(er.message);
      });
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Reports
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
              </LocalizationProvider>
            </Stack>
          </Stack>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <Grid2
          container
          columns={4}
          spacing={4}
          // justifyContent="space-evenly"
          width={"100%"}
        >
          {reports
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
