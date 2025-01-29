import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ReportsPage from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Categories from "./pages/Categories";

function App() {
  return (
    <Routes>
      {/* Wrap routes with the Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
