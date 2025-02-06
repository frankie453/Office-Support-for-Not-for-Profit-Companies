import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Layout from "./components/Layout";
import ReportsPage from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import TaskPage from "./pages/TaskPage";
import PhoneCallForm from "./pages/PhoneCallForm";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useLocation } from "react-router-dom";
import InPersonForm from "./pages/InPersonForm";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

function App() {
  const isAuthenticated = useIsAuthenticated();
  // const { instance } = useMsal();
  // useEffect(() => {
  //   instance
  //     .acquireTokenSilent(loginRequest)
  //     .then((thing) => console.log(thing.accessToken));
  // }, [isAuthenticated]);
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
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="tasks" element={<TaskPage />} />
            <Route path="phonecallform" element={<PhoneCallForm />} />
            <Route path="inpersonform" element={<InPersonForm />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
