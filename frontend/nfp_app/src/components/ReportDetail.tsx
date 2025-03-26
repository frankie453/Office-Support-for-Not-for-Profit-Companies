import { Paper, Stack, Typography } from "@mui/material";
import {
  Report,
  ReportContentCalls,
  ReportContentEmails,
  ReportContentVisits,
  ReportType,
} from "../types";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function ReportDetail({
  title,
  report,
}: {
  title: string;
  report: Report;
}) {
  return (
    <Paper style={{ padding: 3 }}>
      <Stack alignItems={"center"} spacing={2}>
        <Typography fontWeight={"bold"} variant="h3">
          {title}
        </Typography>

        {report.metadata.type === ReportType.EMAILS && (
          <>
            <Typography variant="h6">
              {"Total Incoming Emails: " + (report.content as ReportContentEmails).incoming.total}
            </Typography>
            {(report.content as ReportContentEmails).outcoming && (
              <Typography variant="h6">
                {"Total Outgoing Emails: " + (report.content as ReportContentEmails).outcoming.total}
              </Typography>
            )}
            <Typography style={{ textDecoration: "underline" }}>
              Weekly Trends
            </Typography>
            <LineChart
              xAxis={[{
                data: [1, 2, 3, 4],
                min: 1,
                max: 4,
              }]}
              series={[
                {
                  data: (report.content as ReportContentEmails).incoming.byWeek,
                  label: 'Incoming'
                },
                {
                  data: (report.content as ReportContentEmails).outcoming?.byWeek || [],
                  label: 'Outgoing'
                }
              ]}
              width={500}
              height={300}
            />
            <Typography style={{ textDecoration: "underline" }}>
              By Category
            </Typography>
            <PieChart
              series={[
                {
                  data: (report.content as ReportContentEmails).incoming.byCategory
                }
              ]}
              width={400}
              height={200}
            />
          </>
        )}

        {report.metadata.type === ReportType.CALLS && (
          <>
            <Typography variant="h6">
              {"Total this month: " +
                (report.content as ReportContentCalls).total}
            </Typography>
            <Typography style={{ textDecoration: "underline" }}>
              Per Day
            </Typography>
            <LineChart
              xAxis={[
                {
                  data: (report.content as ReportContentCalls).byDay.map(
                    (value, i) => i + 1
                  ),
                  min: 1,
                  max: (report.content as ReportContentCalls).byDay.length,
                },
              ]}
              series={[
                {
                  data: (report.content as ReportContentCalls).byDay,
                },
              ]}
              width={500}
              height={300}
            />
            <Typography style={{ textDecoration: "underline" }}>
              By Issue
            </Typography>
            <PieChart
              series={[
                {
                  data: (report.content as ReportContentCalls).byIssue,
                },
              ]}
              width={400}
              height={200}
            />
            <Typography style={{ textDecoration: "underline" }}>
              By Employee
            </Typography>
            <PieChart
              series={[
                {
                  data: (report.content as ReportContentCalls).byEmployee,
                },
              ]}
              width={400}
              height={200}
            />
          </>
        )}
        {report.metadata.type === ReportType.INPERSON && (
          <>
            <Typography variant="h6">
              {"Total Visits this month: " +
                (report.content as ReportContentVisits).total}
            </Typography>
            <Typography style={{ textDecoration: "underline" }}>
              Per Day
            </Typography>
            <LineChart
              xAxis={[
                {
                  data: (report.content as ReportContentVisits).byDay.map(
                    (value, i) => i + 1
                  ),
                  min: 1,
                  max: (report.content as ReportContentVisits).byDay.length,
                },
              ]}
              series={[
                {
                  data: (report.content as ReportContentVisits).byDay,
                },
              ]}
              width={500}
              height={300}
            />
            <Typography style={{ textDecoration: "underline" }}>
              By Purpose
            </Typography>
            <PieChart
              series={[
                {
                  data: (report.content as ReportContentVisits).byPurpose,
                },
              ]}
              width={400}
              height={200}
            />
            <Typography style={{ textDecoration: "underline" }}>
              By Employee
            </Typography>
            <PieChart
              series={[
                {
                  data: (report.content as ReportContentVisits).byEmployee,
                },
              ]}
              width={400}
              height={200}
            />
          </>
        )}
      </Stack>
    </Paper>
  );
}
