import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import History from "./pages/History/History";
import Analytics from "./pages/Analytics/Analytics";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
