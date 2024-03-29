import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import CasesCard from "../common/CasesCard";
import CasesTable from "../common/CasesTable";
import Addcase from "../Modals/Addcase";

import {
  getAllHighCasesCount,
  getAllHighCourtCases,
  getAllCompletedHighCasesCount,
  getAllRunningHighCasesCount,
  getAllPendingHighCasesCount,
} from "../Services/Api";
import { tokenData } from "../Services/Config";
import { useModal } from "../hooks/ModalStateProvider";

const HighCourt = ({ currentScreen, setCurrentScreen }) => {
  authenticate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingHighCourtCasesCount, setPendingHighCourtCasesCount] =
    useState(0);
  const [runningHighCourtCasesCount, setRunningHighCourtCasesCount] =
    useState(0);
  const [completedHighCourtCasesCount, setCompletedHighCourtCasesCount] =
    useState(0);
  const [highCourtCases, setHighCourtCases] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { isOpen } = useModal();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  useEffect(() => {
    setCurrentScreen("High Court");
    getAllHighCourtCasesFunction();
    getAllCasesCountFunction();
  }, []);

  useEffect(() => {
    setCurrentScreen("High Court");
    getAllHighCourtCasesFunction();
    getAllCasesCountFunction();
  }, [isFormOpen, isOpen]);

  const getAllCasesCountFunction = async () => {
    setCompletedHighCourtCasesCount(await getAllCompletedHighCasesCount());
    setRunningHighCourtCasesCount(await getAllRunningHighCasesCount());
    setPendingHighCourtCasesCount(await getAllPendingHighCasesCount());
  };

  const getAllHighCourtCasesFunction = async () => {
    const res = await getAllHighCourtCases();
    setHighCourtCases(res);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
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
                {/* <FilterButton />
                <Datepicker /> */}
                {tokenData.role == 3 && (
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

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <CasesCard
                mainTitle={"High Court Pending Cases"}
                casesNumber={pendingHighCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"High Court Running Cases"}
                casesNumber={runningHighCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"High Court Completed Cases"}
                casesNumber={completedHighCourtCasesCount}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesTable
                cases={highCourtCases}
                tableName={"High Court Current Cases"}
              />
            </div>
          </div>
        </main>
        <Addcase isOpen={isFormOpen} onClose={closeForm} />
      </div>
    </div>
  );
};

export default HighCourt;
