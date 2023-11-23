import { React, useState, useEffect, useRef } from "react";
import { addSections, updateSection } from "../Services/Api";
function AddSections({ isOpen, onClose, editAddSection, acts }) {
  const actId = useRef(null);
  const sectionName = useRef(null);
  const sectionDescription = useRef(null);

  const [form, setForm] = useState({
    ActId: "",
    name: "",
    Description: "",
  });
  const [selectedValues, setSelectedValues] = useState({
    ActId: "",
  });
  const [updateform, setUpdateForm] = useState({
    id: editAddSection ? (editAddSection.id ? editAddSection.id : "") : "",
    name: editAddSection
      ? editAddSection.name
        ? editAddSection.name
        : ""
      : "",
    Description: editAddSection
      ? editAddSection.description
        ? editAddSection.description
        : ""
      : "",
  });

  useEffect(() => {
    if (editAddSection) {
      setUpdateForm({
        id: editAddSection.id || "",
        name: editAddSection.name || "",
        Description: editAddSection.description || "",
      });
    } else {
      // Clear the updateform when there's no editAddSection
      setUpdateForm({
        id: "",
        name: "",
        Description: "",
      });
    }
  }, [editAddSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setSelectedValues({
      ...selectedValues,
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
      const dataToAdd = { ...form, ...selectedValues };
      const res = await addSections(dataToAdd);
      actId.current.value = "";
      sectionName.current.value = "";
      sectionDescription.current.value = "";
    } else if (e.target.textContent === "Update") {
      // const res = await updateSection(updateform);
    }
    onClose();
  };
  const modelClose = async () => {
    if (!editAddSection) {
      actId.current.value = "";
      sectionName.current.value = "";
      sectionDescription.current.value = "";
    }
    onClose();
  }
  if (editAddSection) {
    return (
      <>
        <div
          className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? "block" : "hidden"
            }`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
              <div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Sections Name:
                  </label>
                  <input
                    defaultValue={updateform.name}
                    onChange={updatehandleInputChange}
                    type="text"
                    name="name"
                    placeholder="Sections Name"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Sections description:
                  </label>
                  <input
                    defaultValue={updateform.Description}
                    onChange={updatehandleInputChange}
                    type="text"
                    name="Description"
                    placeholder="Act description"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label>ActType</label>
                  {/* <select
                  id="actid"
                  name="ActId"
                  onChange={(e) => handleSelectChange("ActId", e.target.value)}
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="">Select a Act Type</option>
                  {allacts.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select> */}
                </div>
                <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                  >
                    Update
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
      </>
    );
  }
  return (
    <>
      <div
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? "block" : "hidden"
          }`}
      >
        <div className="relative transform overflow-hidden rounded-lg dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Sections Name:
                </label>
                <input
                  ref={sectionName}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  placeholder="Sections Name"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Sections description:
                </label>
                <input
                  ref={sectionDescription}
                  onChange={handleInputChange}
                  type="text"
                  name="Description"
                  placeholder="Sections description"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label>ActType</label>
                <select
                  ref={actId}
                  id="actid"
                  name="ActId"
                  onChange={(e) => handleSelectChange("ActId", e.target.value)}
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="">Select a Act Type</option>
                  {acts.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
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
    </>
  );
}

export default AddSections;
