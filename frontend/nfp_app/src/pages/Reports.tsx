import {
  AppBar,
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
import { useState } from "react";
import { ReportType } from "../types";
import { Dayjs } from "dayjs";
import { Link, NavLink } from "react-router";

type ReportFilter = {
  type: ReportType | string;
  start: Dayjs | null;
  end: Dayjs | null;
};

export default function ReportsPage() {
  const [reportTypeFilter, setReportTypeFilter] = useState<ReportFilter>({
    type: "All",
    start: null,
    end: null,
  });
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={"row"} justifyContent={"space-between"} flex={1}>
            <Typography
              color="inherit"
              component={Link}
              to={"/"}
              fontWeight={"normal"}
              variant="h6"
              sx={{ flexGrow: 1 }}
              style={{ textDecoration: "none" }}
            >
              Reports
            </Typography>
            <Button color="inherit">Login</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Paper style={{ padding: 20 }}>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-around"}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={5}
            >
              {/* <TextField fullWidth placeholder={"Search report..."}></TextField> */}
              <FormControl>
                <InputLabel id="select-report-type-label">
                  Report Type
                </InputLabel>
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
      </Paper>
    </>
  );
}
