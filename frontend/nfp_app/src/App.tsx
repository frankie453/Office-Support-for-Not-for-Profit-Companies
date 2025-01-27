import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "./ProTip";
import ReportsPage from "./pages/Reports";
import { Button, Link } from "@mui/material";
import { Route, Routes, Link as RouterLink } from "react-router";

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                  <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Material UI Vite.js example in TypeScript
                  </Typography>
                  <ProTip />
                  <Copyright />
                </Box>
              </Container>
              <Button component={RouterLink} to="reports" variant="contained">
                To Reports
              </Button>
            </>
          }
        />
        <Route path="reports" element={<ReportsPage />} />
      </Routes>
    </>
  );
}
