import React from "react";
import { Outlet } from "react-router-dom"; // For routing
import { Link as RouterLink } from "react-router";
import Navbar from "./NavBar";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Layout({
  handleSession,
}: {
  handleSession: (session: string | null) => void;
}) {
  const drawerWidth = 80; // Match NavBar width

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Navbar handleSession={handleSession} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: 4,
            px: 3,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
