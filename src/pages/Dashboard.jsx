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
  getAllHighCourtCases,
  getAllDistrictCourtCases,
  getAllSupremeCourtCases,
} from "../Services/Api";

function Dashboard({ caseData, currentScreen, setCurrentScreen }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addCaseOpen, setAddCaseOpen] = useState(false);
  const [highCourtCasesCount, setHighCourtCasesCount] = useState(0);
  const [districtCourtCasesCount, setDistrictCourtCasesCount] = useState(0);
  const [supremeCourtCasesCount, setSupremeCourtCasesCount] = useState(0);
  const [highCourtCases, setHighCourtCases] = useState([]);
  const [districtCourtCases, setDistrictCourtCases] = useState([]);
  const [supremeCourtCases, setSupremeCourtCases] = useState([]);

  const closeAddCaseModel = () => {
    setAddCaseOpen(false);
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(tokenData);

    setCurrentScreen("Dashboard");
    getAllCasesCountFunction();
    getAllHighCourtCasesFunction();
    getAllDistrictCourtCasesFunction();
    getAllSupremeCourtCasesFunction();
  }, []);

  const getAllCasesCountFunction = async () => {
    setDistrictCourtCasesCount(await getAllDistrictCasesCount());
    setHighCourtCasesCount(await getAllHighCasesCount());
    setSupremeCourtCasesCount(await getAllSupremeCasesCount());
  };

  const getAllHighCourtCasesFunction = async () => {
    const res = await getAllHighCourtCases();
    setHighCourtCases(res);
  };

  const getAllDistrictCourtCasesFunction = async () => {
    const res = await getAllDistrictCourtCases();
    setDistrictCourtCases(res);
  };

  const getAllSupremeCourtCasesFunction = async () => {
    const res = await getAllSupremeCourtCases();
    setSupremeCourtCases(res);
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
                mainTitle={"District Court Cases"}
                casesNumber={districtCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesCard
                mainTitle={"High Court Cases"}
                casesNumber={highCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesCard
                mainTitle={"Supreme Court Cases"}
                casesNumber={supremeCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesTable
                caseData={caseData}
                tableName={"District Court Current Cases"}
                cases={districtCourtCases}
              />
              <CasesTable
                tableName={"High Court Current Cases"}
                cases={highCourtCases}
              />
              <CasesTable
                tableName={"Supreme Court Current Cases"}
                cases={supremeCourtCases}
              />
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
}

export default Dashboard;
