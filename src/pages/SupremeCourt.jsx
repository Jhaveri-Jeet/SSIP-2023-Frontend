import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import CasesCard from "../common/CasesCard";
import CasesTable from "../common/CasesTable";

import {
  getAllSupremeCasesCount,
  getAllSupremeCourtCases,
  getAllCompletedSupremeCasesCount,
  getAllRunningSupremeCasesCount,
  getAllPendingSupremeCasesCount,
} from "../Services/Api";
import Addcase from "../Modals/Addcase";
import { authenticate } from "../utils/Auth";

const SupremeCourt = ({ currentScreen, setCurrentScreen }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingSupremeCourtCasesCount, setPendingSupremeCourtCasesCount] =
    useState(0);
  const [runningSupremeCourtCasesCount, setRunningSupremeCourtCasesCount] =
    useState(0);
  const [completedSupremeCourtCasesCount, setCompletedSupremeCourtCasesCount] =
    useState(0);
  const [supremeCourtCases, setSupremeCourtCases] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    authenticate();
    setCurrentScreen("Supreme Court");
    getAllSupremeCourtCasesFunction();
    getAllCasesCountFunction();
  }, []);

  useEffect(() => {
    setCurrentScreen("Supreme Court");
    getAllSupremeCourtCasesFunction();
    getAllCasesCountFunction();
  }, [isFormOpen]);

  const getAllCasesCountFunction = async () => {
    setCompletedSupremeCourtCasesCount(await getAllCompletedSupremeCasesCount());
    setRunningSupremeCourtCasesCount(await getAllRunningSupremeCasesCount());
    setPendingSupremeCourtCasesCount(await getAllPendingSupremeCasesCount());
  };

  const getAllSupremeCourtCasesFunction = async () => {
    const res = await getAllSupremeCourtCases();
    setSupremeCourtCases(res);
    console.log("res", res)
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
                 
                {localStorage.getItem("userId") == 4 && (
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={openForm}
                  >
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add Case</span>
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <CasesCard
                mainTitle={"Supreme Court Pending Cases"}
                casesNumber={pendingSupremeCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"Supreme Court Current Cases"}
                casesNumber={runningSupremeCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"Supreme Court Completed Cases"}
                casesNumber={completedSupremeCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesTable
                cases={supremeCourtCases}
                tableName={"Supreme Court Current Cases"}
              />

            </div>
          </div>
        </main>
        <Addcase isOpen={isFormOpen} onClose={closeForm} />
      </div>
    </div>
  );
};

export default SupremeCourt;
