import { React, useState, useEffect } from "react";
import { addSections, updateSection } from "../Services/Api";
function AddSections({ isOpen, onClose, editAddSection, acts }) {
  const [form, setForm] = useState({
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
      const res = await addSections(parseInt(selectedValues.ActId), form);
    } else if (e.target.textContent === "Update") {
      console.log("update:", updateform);
      // const res = await updateSection(updateform);
    }
    onClose();
  };
  if (editAddSection) {

    return (
      <>
        <div
          className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
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
                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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
                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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
                    className="bg-[#10375e] hover:bg-[#185490] text-white font-semibold hover:text-white py-2 px-4 border  rounded focus:outline-none focus:ring-0"
                  >
                    Update
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white text-[#10375e] font-bold  py-2 px-5 border hover:border-[#10375e] rounded focus:outline-none focus:ring-0"
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
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Sections Name:
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  placeholder="Sections Name"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Sections description:
                </label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="Description"
                  placeholder="Sections description"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label>ActType</label>
                <select
                  id="actid"
                  name="ActId"
                  onChange={(e) => handleSelectChange("ActId", e.target.value)}
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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
                  className="bg-[#10375e] hover:bg-[#185490] text-white font-semibold hover:text-white py-2 px-4 border  rounded focus:outline-none focus:ring-0"
                >
                  Add
                </button>
                <button
                  onClick={onClose}
                  className="bg-white text-[#10375e] font-bold  py-2 px-5 border hover:border-[#10375e] rounded focus:outline-none focus:ring-0"
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
