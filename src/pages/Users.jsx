import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import InsertCourt from "../Modals/InsertCourt";
import CasesTable from "../common/CasesTable";
import { getAllCourts, getCourtsUsers } from "../Services/Api";
import { tokenData } from "../Services/Config";
import InsertUsers from "../Modals/InsertUsers";
import { useModal } from "../hooks/ModalStateProvider";

const Users = ({ currentScreen, setCurrentScreen }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const {isOpen} = useModal();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    UserName: "",
    PasswordHash: "123",
    roleId: tokenData.role,
    districtId: tokenData.districtId,
    courtId: tokenData.courtId
  });
  const openForm = () => {
    setIsFormOpen(true);  
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const onSubmitForm = (data) => {
    setFormData(data);

    if (Object.values(data).some((value) => !value)) {
      setBannerOpen(true);

      setTimeout(() => {
        setBannerOpen(false);
      }, 5000);
    }
  };

  const getAllUsersData = async () => {
    const data = await getCourtsUsers(tokenData.courtId);
    setUsers(data);
  };
  useEffect(() => {
    setCurrentScreen("Users");
    getAllUsersData();
  }, []);

  useEffect(() => {
    setCurrentScreen("Users");
    getAllUsersData();
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
                  <span className="hidden xs:block ml-2">Add Users</span>
                </button>
              </div>
            </div>
            <InsertUsers
              isOpen={isFormOpen}
              onClose={closeForm}
              onSubmitForm={onSubmitForm}
              getAllUsersData={getAllUsersData}
            />
            <div className="grid grid-cols-12 gap-6">
              <CasesTable
                getAllUsersData={getAllUsersData}
                Users={users}
                tableName={"Users Lists"}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
