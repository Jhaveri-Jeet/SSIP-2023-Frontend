import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import AddCaseType from "../Modals/AddCaseType";
import CasesTable from "../common/CasesTable";
import { getAllCaseType } from "../Services/Api";
import { useModal } from "../hooks/ModalStateProvider";

const CaseType = ({ currentScreen, setCurrentScreen }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [caseType, setCaseType] = useState([]);

  const { isOpen } = useModal();

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  const getAllCaseTypeData = async () => {
    const data = await getAllCaseType();
    setCaseType(data);
  };
  useEffect(() => {
    setCurrentScreen("CaseType");
    getAllCaseTypeData();
  }, []);

  useEffect(() => {
    setCurrentScreen("CaseType");
    getAllCaseTypeData();
  }, [isFormOpen, isOpen]);

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
                  <span className="hidden xs:block ml-2">Add CaseType</span>
                </button>
              </div>
            </div>
            <AddCaseType isOpen={isFormOpen} onClose={closeForm} />
            <div className="grid grid-cols-12 gap-6">
              <CasesTable CaseType={caseType} tableName={"CaseType"} />
            </div>
          </div>
        </main>

        {/* <Banner /> */}
      </div>
    </div>
  );
};

export default CaseType;
