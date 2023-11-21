import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getAllCases } from "./Services/Api";
import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./partials/dashboard/Analytics";
import HighCourt from "./pages/HighCourt";
import Login from "./pages/Login";
import DistrictCourt from "./pages/DistrictCourt";
import SupremeCourt from "./pages/SupremeCourt";
import ShowCaseDetail from "./pages/ShowCaseDetail";
import Courts from "./pages/Courts";
import Advocates from "./pages/Advocates";
import Acts from "./pages/Acts";
import CaseType from "./pages/CaseType";
import EvidencePage from './pages/EvidencePage';
import Cases from "./pages/Cases";
import States from "./pages/States";
import Sections from "./pages/Sections";
import Districts from "./pages/Districts";
import Demo from './pages/Demo';
import { authenticate } from "./utils/Auth";

function App() {

  const location = useLocation();
  const [caseData, setCaseData] = useState([]);

  const [currentScreen, setCurrentScreen] = useState("Dahsboard");

  useEffect(() => {
    authenticate();
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    async function fetchData() {
      const casesData = await getAllCases();
      setCaseData(casesData);
    }

    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact 
          path="/" 
          element={
            <Login />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard
              caseData={caseData}
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/cases"
          element={
            <Cases
              caseData={caseData}
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/highcourt"
          element={
            <HighCourt
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/districtcourt"
          element={
            <DistrictCourt
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/supremecourt"
          element={
            <SupremeCourt
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/courts"
          element={
            <Courts
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/advocates"
          element={
            <Advocates
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/acts"
          element={
            <Acts
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/Casetype"
          element={
            <CaseType
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/states"
          element={
            <States
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/districts"
          element={
            <Districts
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route
          exact
          path="/dashboard/evidence"
          element={
            <EvidencePage
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
        <Route 
          exact
          path="/dashboard/analytics"
          element={
            <Analytics />
          }
        />
        <Route
          exact
          path="/dashboard/showcasedetail/:caseid"
          element={
            <ShowCaseDetail />
          }
        />
        <Route
          exact
          path="/dashboard/demo"
          element={
            <Demo />
          }
        />
        <Route
          exact
          path="/dashboard/sections"
          element={
            <Sections
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
