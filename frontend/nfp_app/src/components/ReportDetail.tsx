import { Paper, Stack, Typography } from "@mui/material";
import {
  Report,
  ReportContentCalls,
  ReportContentEmails,
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
    <Paper style={{ padding: 2 }}>
      <Stack alignItems={"center"} spacing={2}>
        {report.metadata.type === ReportType.CALLS && (
          <>
            <Typography fontWeight={"bold"} variant="h3">
              {title}
            </Typography>
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
        {/* <Typography fontWeight={"bold"} variant="h3">
          {title}
        </Typography>
        <Typography variant="h4">Incoming</Typography>
        <Typography variant="h6">
          {"Total this month: " + report.content.incoming.total}
        </Typography>
        <Typography variant="h6">
          {"Per Day: " +
            Math.round(
              report.content.incoming.total /
                daysInMonth(
                  report.metadata.date.getMonth(),
                  report.metadata.date.getFullYear()
                )
            )}
        </Typography>
        <Typography style={{ textDecoration: "underline" }}>
          Per Week
        </Typography>

        <LineChart
          xAxis={[
            {
              data: report.content.incoming.byWeek.map((value, i) => i + 1),
            },
          ]}
          series={[
            {
              data: report.content.incoming.byWeek,
            },
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
              data: report.content.incoming.byCategory,
            },
          ]}
          width={400}
          height={200}
        />
        {[ReportType.CALLS, ReportType.EMAILS].includes(
          report.metadata.type
        ) && (
          <>
            <Typography variant="h3">Outcoming</Typography>
            <Typography variant="h6">
              {"Total this month: " + outcoming.total}
            </Typography>
            <Typography variant="h6">
              {"Per Day: " +
                Math.round(
                  outcoming.total /
                    daysInMonth(
                      report.metadata.date.getMonth(),
                      report.metadata.date.getFullYear()
                    )
                )}
            </Typography>
            <Typography style={{ textDecoration: "underline" }}>
              Per Week
            </Typography>

            <LineChart
              xAxis={[
                {
                  data: outcoming.byWeek.map((value, i) => i + 1),
                },
              ]}
              series={[
                {
                  data: outcoming.byWeek,
                },
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
                  data: outcoming.byCategory,
                },
              ]}
              width={400}
              height={200}
            />
          </>
        )} */}
      </Stack>
    </Paper>
  );
}
