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
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReportGridIcon } from "../components/ReportGridIcon";
import { useEffect, useState } from "react";
import { ReportType, Report } from "../types";
import { Dayjs } from "dayjs";
import { Link, NavLink } from "react-router";
import { ReportGenerator } from "../components/ReportGenerator";
import { getEmailReports } from '../services/reportService';
import { useMsal } from "@azure/msal-react";
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
  const { instance } = useMsal();

  const [reportTypeFilter, setReportTypeFilter] = useState<ReportFilter>({
    type: "All",
    start: null,
    end: null,
  });

  const handleReportGenerated = async () => {
    await getEmailReports(instance);
  };

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
  const getVisitsData = (date: Date, forms: any[]) => {
    const total: number = forms.length;
    const byDay: number[] = Array(daysInMonth(date)).fill(0);
    const byPurpose: { label: string; value: number }[] = [];
    const byEmployee: { label: string; value: number }[] = [];
  
    for (let i = 0; i < forms.length; i++) {
      const form_date = new Date(forms[i].date.replace("-", "/"));
      byDay[form_date.getDate() - 1] = byDay[form_date.getDate() - 1] + 1;
  
      if (forms[i].visitPurpose) {
        const purposeIndex = byPurpose.findIndex(
          (entry) => entry.label === forms[i].visitPurpose.toUpperCase()
        );
        if (purposeIndex === -1) {
          byPurpose.push({ label: forms[i].visitPurpose.toUpperCase(), value: 1 });
        } else {
          byPurpose[purposeIndex] = {
            label: forms[i].visitPurpose.toUpperCase(),
            value: byPurpose[purposeIndex].value + 1,
          };
        }
      }
  
      if (forms[i].taskTransferredTo) {
        const employeeIndex = byEmployee.findIndex(
          (entry) => entry.label === forms[i].taskTransferredTo.toUpperCase()
        );
        if (employeeIndex === -1) {
          byEmployee.push({
            label: forms[i].taskTransferredTo.toUpperCase(),
            value: 1,
          });
        } else {
          byEmployee[employeeIndex] = {
            label: forms[i].taskTransferredTo.toUpperCase(),
            value: byEmployee[employeeIndex].value + 1,
          };
        }
      }
    }
  
    return {
      total: total,
      byDay: byDay,
      byPurpose: byPurpose,
      byEmployee: byEmployee,
    };
  };
   
  useEffect(() => {
    Promise.all([
      axios.get(BASE_URL + "api/reports/calls/"),
      axios.get(BASE_URL + "api/reports/visits/"),
      getEmailReports(instance)
    ])
      .then(([callsRes, visitsRes, emailsRes]) => {
        const callsReports = callsRes.data.map((entry: any) => ({
          metadata: {
            id: Number(entry.id),
            date: new Date(entry.starting_month_year.replace("-", "/")),
            type: ReportType.CALLS,
          },
          content: getCallsData(new Date(entry.starting_month_year), entry.forms),
        }));

        const visitsReports = visitsRes.data.map((entry: any) => ({
          metadata: {
            id: Number(entry.id),
            date: new Date(entry.starting_month_year.replace("-", "/")),
            type: ReportType.INPERSON,
          },
          content: getVisitsData(new Date(entry.starting_month_year), entry.forms),
        }));

        const emailReports = emailsRes.map((report: any) => ({
          metadata: {
            id: report.metadata.id,
            date: new Date(report.metadata.date),
            type: ReportType.EMAILS,
          },
          content: report.content
        }));

        setReports([...callsReports, ...visitsReports, ...emailReports]);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3}}>
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
                  <ReportGenerator onReportGenerated={handleReportGenerated} />
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
