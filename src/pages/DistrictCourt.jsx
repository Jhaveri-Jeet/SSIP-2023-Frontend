import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import CasesCard from "../common/CasesCard";
import CasesTable from "../common/CasesTable";
import Addcase from "../Modals/Addcase";
import { tokenData } from "../Services/Config";
import {
  getAllDistrictCourtCases,
  getAllDistrictPendingCasesCount,
  getAllDistrictRunningCasesCount,
  getAllDistrictCompletedCasesCount,
} from "../Services/Api";
<<<<<<< HEAD
import { authenticate } from "../utils/Auth";
=======
import { useModal } from "../hooks/ModalStateProvider";
>>>>>>> 1adee70cf056466b813cf4ac23c6f9ec4ffe68bb

const DistrictCourt = ({ caseData, currentScreen, setCurrentScreen }) => {
  authenticate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [districtCourtCases, setDistrictCourtCases] = useState("");
  const [districtPendingCourtCases, setDistrictPendingCourtCases] =
    useState("");
  const [districtRunningCourtCases, setDistrictRunningCourtCases] =
    useState("");
  const [districtCompletedCourtCases, setDistrictCompletedCourtCases] =
    useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  const getAllDistrictCourtCasesFunction = async () => {
    const res = await getAllDistrictCourtCases();
    setDistrictCourtCases(res);
  };
  const getAllDistrictPendingCourtCasesFunction = async () => {
    const res = await getAllDistrictPendingCasesCount();
    setDistrictPendingCourtCases(res);
  };
  const getAllDistrictRunningCourtCasesFunction = async () => {
    const res = await getAllDistrictRunningCasesCount();
    setDistrictRunningCourtCases(res);
  };
  const getAllDistrictCompletedCourtCasesFunction = async () => {
    const res = await getAllDistrictCompletedCasesCount();
    setDistrictCompletedCourtCases(res);
  };

  const {isOpen} = useModal()

  useEffect(() => {
    setCurrentScreen("District Court");
    getAllDistrictCourtCasesFunction();
    getAllDistrictPendingCourtCasesFunction();
    getAllDistrictCompletedCourtCasesFunction();
    getAllDistrictRunningCourtCasesFunction();
  }, []);

  useEffect(() => {
    setCurrentScreen("District Court");
    getAllDistrictCourtCasesFunction();
    getAllDistrictPendingCourtCasesFunction();
    getAllDistrictCompletedCourtCasesFunction();
    getAllDistrictRunningCourtCasesFunction();
  }, [isFormOpen,isOpen]);

  console.log("districtCompletedCourtCases :", districtCompletedCourtCases);
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
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* <FilterButton /> */}
                {/* Datepicker built with flatpickr */}
                {/* <Datepicker /> */}
                {/* Add view button */}
                {tokenData.role == 1 && (
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
                mainTitle={"District Court Pending Cases"}
                casesNumber={districtPendingCourtCases}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"District Court Running Cases"}
                casesNumber={districtRunningCourtCases}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />
              <CasesCard
                mainTitle={"District Court Completed Cases"}
                casesNumber={districtCompletedCourtCases}
                options={[{ name: "Option 1" }, { name: "Option 2" }]}
              />

              <CasesTable
                caseData={caseData}
                tableName={"District Court Cases"}
                cases={districtCourtCases}
              />
            </div>
          </div>
        </main>
        <Addcase isOpen={isFormOpen} onClose={closeForm} />

        {/* <Banner /> */}
      </div>
    </div>
  );
};

export default DistrictCourt;
