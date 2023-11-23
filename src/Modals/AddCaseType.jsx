import { React, useState ,useEffect } from "react";
import { addCaseType, updateCaseType } from "../Services/Api";

function AddCaseType({ isOpen, onClose, editCaseTypeData }) {
  const [form, setForm] = useState({
    name: "",
    Description: "",
  });
  const [updateform, setUpdateForm] = useState({
    id: editCaseTypeData ? (editCaseTypeData.id ? editCaseTypeData.id : "") : "",
    name: editCaseTypeData ? (editCaseTypeData.name ? editCaseTypeData.name : "") : "",
    Description: editCaseTypeData ? (editCaseTypeData.description ? editCaseTypeData.description : "") : "",
  });

  useEffect(() => {
    if (editCaseTypeData) {
      setUpdateForm({
        id: editCaseTypeData.id || "",
        name: editCaseTypeData.name || "",
        Description: editCaseTypeData.description || "",
      });
    } else {
      // Clear the updateform when there's no editCaseTypeData
      setUpdateForm({
        id: "",
        name: "",
        Description: "",
      });
    }
  }, [editCaseTypeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const updatehandleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateform,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.textContent === "Add") {
      const res = await addCaseType(form);
      console.log(res);
    } else if (e.target.textContent === "Update") {
      const res = await updateCaseType(updateform);
      console.log(res);
    }
    onClose();
  };
  if (editCaseTypeData) {
    return (
      <>
        <div
          className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
              <div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Case type Name:
                  </label>
                  <input
                    defaultValue={updateform.name}
                    onChange={updatehandleInputChange}
                    type="text"
                    name="name"
                    placeholder="Casetype Name"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Case description:
                  </label>
                  <input
                    defaultValue={updateform.Description}
                    onChange={updatehandleInputChange}
                    type="text"
                    name="Description"
                    placeholder="Casetype Description"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                  >
                    Update
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white text-[#10375e] font-bold  py-2 px-5 border border-gray-300 rounded focus:outline-none focus:ring-0"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Case type Name:
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  placeholder="Casetype Name"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Case description:
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="Description"
                  placeholder="Casetype Description"
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
                  onClick={onClose}
                  className="bg-white text-[#10375e] font-bold  py-2 px-5 border border-gray-300 rounded focus:outline-none focus:ring-0"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCaseType;
