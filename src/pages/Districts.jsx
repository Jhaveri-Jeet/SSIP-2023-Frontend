import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import InsertDistrict from "../Modals/InsertDistrict";
import { getAllDistrict } from "../Services/Api";
import CasesTable from "../common/CasesTable";
import Banner from "../partials/Banner";
<<<<<<< HEAD
import axios from "axios";
import { authenticate } from "../utils/Auth";
=======
import { useModal } from "../hooks/ModalStateProvider";
>>>>>>> 1adee70cf056466b813cf4ac23c6f9ec4ffe68bb

const Districts = ({ currentScreen, setCurrentScreen }) => {
  authenticate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [districts, setDistricts] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const {isOpen} = useModal()

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const onSubmitForm = (data) => {
    // setFormData(data);

    if (Object.values(data).some((value) => !value)) {
      setBannerOpen(true);

      setTimeout(() => {
        setBannerOpen(false);
      }, 5000);
    }
  };
  const getAllDistrictsData = async () => {
    const data = await getAllDistrict();
    setDistricts(data);
  };

  useEffect(() => {
    setCurrentScreen("Districts");
    getAllDistrictsData();
  }, []);

  useEffect(() => {
    setCurrentScreen("Districts");
    getAllDistrictsData();
  }, [isFormOpen,isOpen]);

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
                  <span className="hidden xs:block ml-2">Add District</span>
                </button>
              </div>
            </div>
            <InsertDistrict
              isOpen={isFormOpen}
              onClose={closeForm}
              getAllDistrictsData={getAllDistrictsData}
            />
            <div className="grid grid-cols-12 gap-6">
              <CasesTable
                getAllDistrictsData={getAllDistrictsData}
                Districts={districts}
                tableName={"Districts Lists"}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Districts;
