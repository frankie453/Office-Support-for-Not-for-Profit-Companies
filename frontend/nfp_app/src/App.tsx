import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Layout from "./components/Layout";
import ReportsPage from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import theme from "./theme";
import Categories from "./pages/Categories";
import TaskPage from "./pages/TaskPage";
import PhoneCallForm from "./pages/PhoneCallForm";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useLocation } from "react-router-dom";
import InPersonForm from "./pages/InPersonForm";

function App() {
  const [session, setSession] = useState(localStorage.getItem("token"));
  // Check if token is valid, if not, clear storage on URL change
  const location = useLocation();
  useEffect(() => {
    axios
      .get(BASE_URL, {
        headers: {
          Authorization: "Token " + session,
        },
      })
      .then(() => {})
      .catch(() => {
        localStorage.removeItem("expiry");
        localStorage.removeItem("token");
        setSession(null);
      });
  }, [location]);
  return (
    <>
      {/* <AppBar position="static" style={{ flex: 1 }}>
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
      </AppBar> */}
      <Routes>
        {session === null ? (
          <Route path="*" element={<LoginPage handleSession={setSession} />} />
        ) : (
          <Route path="/" element={<Layout handleSession={setSession} />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="tasks" element={<TaskPage />} />
            <Route path="form" element={<PhoneCallForm />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        )}

        {/* Wrap routes with the Layout */}
      </Routes>
    </>
  );
}

export default App;
