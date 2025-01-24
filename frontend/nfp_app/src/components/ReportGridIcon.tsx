import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  Typography,
} from "@mui/material";
import { Report, ReportType } from "../types";
import { useState } from "react";
import { ReportDetail } from "./ReportDetail";

export function ReportGridIcon({ report }: { report: Report }) {
  const [open, setOpen] = useState(false);
  var type = "";
  if (report.metadata.type === ReportType.CALLS) type = "Calls";
  else if (report.metadata.type === ReportType.EMAILS) type = "Emails";
  else if (report.metadata.type === ReportType.INPERSON) type = "In Person";
  const title = "Report " + type + " #" + report.metadata.id;
  return (
    <>
      <Card>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia
            sx={{ height: 180 }}
            image="/src/assets/report-icon.jpg"
            title="report image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {"Generated at " + report.metadata.date.toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <ReportDetail title={title} report={report} />
      </Dialog>
    </>
  );
}
