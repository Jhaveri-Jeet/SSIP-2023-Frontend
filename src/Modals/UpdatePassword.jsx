import React, { useState } from "react";
import { checkPassword, updatePassword } from "../Services/Api";
import { tokenData } from "../Services/Config";

export const UpdatePassword = ({ isOpen, setIsOpen }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await checkPassword({
      id: tokenData.unique_name,
      passwordHash: form.oldPassword,
    });
    if (res.status === 200) {
      const response = await updatePassword({
        id: tokenData.unique_name,
        passwordHash: form.newPassword,
      });

      if(response.status === 200){
        setIsOpen(false)
      }
    }
  };

  const modelClose = () => {
    setIsOpen(false);
  };

  if (isOpen) {
    return (
      <div
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden block`}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Old Password :
                </label>
                <input
                  // ref={actName}
                  onChange={handleInputChange}
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  New Password:
                </label>
                <input
                  // ref={actDescription}
                  onChange={handleInputChange}
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                >
                  Add
                </button>
                <button
                  onClick={modelClose}
                  className="bg-white text-[#10375e] font-bold  py-2 px-5 border border-gray-300 rounded focus:outline-none focus:ring-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
