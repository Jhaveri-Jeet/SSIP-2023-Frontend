import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import CasesCard from "../common/CasesCard";
import CasesTable from "../common/CasesTable";
import { advocates, courts, acts } from "../constant";
import { tokenData } from "../Services/Config";
import {
  getAllHighCasesCount,
  getAllDistrictCasesCount,
  getAllSupremeCasesCount,
  getCasesAccToCourt
} from "../Services/Api";
import { authenticate } from "../utils/Auth";

function Dashboard({ caseData, currentScreen, setCurrentScreen }) {
  authenticate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addCaseOpen, setAddCaseOpen] = useState(false);
  const [highCourtCasesCount, setHighCourtCasesCount] = useState(0);
  const [districtCourtCasesCount, setDistrictCourtCasesCount] = useState(0);
  const [supremeCourtCasesCount, setSupremeCourtCasesCount] = useState(0);
  const [courtCases, setCourtCases] = useState([]);

  const closeAddCaseModel = () => {
    setAddCaseOpen(false);
  };
  const userCourtId = tokenData.courtId;
  const userRoleId = tokenData.role;
  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }
    setCurrentScreen("Dashboard");
    getAllCasesCountFunction();
    getAllCourtCases(userCourtId);
  }, []);

  const getAllCasesCountFunction = async () => {
    setDistrictCourtCasesCount(await getAllDistrictCasesCount());
    setHighCourtCasesCount(await getAllHighCasesCount());
    setSupremeCourtCasesCount(await getAllSupremeCasesCount());
  };

  
  const getAllCourtCases = async (courtId) => {
    const res = await getCasesAccToCourt(courtId);
    console.log(res)
    setCourtCases(res);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-end sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <CasesCard
                location="districtcourt"
                mainTitle={"District Court Cases"}
                casesNumber={districtCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesCard
                location="highcourt"
                mainTitle={"High Court Cases"}
                casesNumber={highCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesCard
                location="supremecourt"
                mainTitle={"Supreme Court Cases"}
                casesNumber={supremeCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              {userRoleId == 1 && (
                <CasesTable
                  caseData={caseData}
                  tableName={"District Court Current Cases"}
                  cases={courtCases}
                />
              )}
              {userRoleId == 3 && (
                <CasesTable
                  tableName={"High Court Current Cases"}
                  cases={courtCases}
                />
              )}
              {userRoleId == 4 && (
                <CasesTable
                  tableName={"Supreme Court Current Cases"}
                  cases={courtCases}
                />
              )}
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default Dashboard;
