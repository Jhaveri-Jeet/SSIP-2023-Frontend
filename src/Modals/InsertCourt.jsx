import { React, useState, useEffect } from "react";
import { getAllDistrict } from "../Services/Api";


function InsertCourt({ isOpen, onClose, onSubmitForm }) {

  // const allStates = [
  //   "Andhra Pradesh",
  //   "Arunachal Pradesh",
  //   "Assam" /* ... add all states */,
  // ];

  const [districtDataList, setdistrictDataList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    identificationNumber:"",
    Districtname: "",
    fullAddress: "",
  });
  const [selectedValues, setSelectedValues] = useState({
      RoleId: "",
      StateId: "",
      DistrictId: "",
    });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(parseInt(selectedValues.RoleId),form);
    // addCourt(form); // Pass the form data to the parent component

    onClose();
  };

  useEffect(() => {
    getAllDistrict().then((response) => {
      return response;
    }).then((data) => {
      setdistrictDataList(prev=>{
        prev = data;
        return [...prev];
      })
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  

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
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select Court Type:
                </label>
                <select
                  defaultValue={form.roleId}
                  onChange={(e) =>
                        handleSelectChange("RoleId", e.target.value)
                      }
                  id="roleId"
                  name="roleId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled>Select a district</option>
                  <option id="1">District Court</option>
                  <option id="2">State Court</option>
                  <option id="3">Supreme Court</option>
                  
                </select>
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Court Name:
                </label>
                <input
                  defaultValue={form.name}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  placeholder="Court Name"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Identification Number:
                </label>
                <input
                  defaultValue={form.identificationNumber}
                  onChange={handleInputChange}
                  type="text"
                  name="identificationNumber"
                  placeholder="identificationNumber"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Select State:
                </label>
                <input
                  defaultValue="Gujarat"
                  onChange={handleInputChange}
                  type="text"
                  name="stateId"
                  placeholder="Statename"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  disabled="disabled"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select District:
                </label>
                <select
                  defaultValue={form.districtId}
                  onChange={(e) =>
                    handleSelectChange("District Id", e.target.value)
                  }
                  id="district"
                  name="districtId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled>Select a district</option>
                  {districtDataList.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  fullAddress
                </label>
                <input
                  defaultValue={form.fullAddress}
                  onChange={handleInputChange}
                  type="text"
                  name="fullAddress"
                  placeholder="fullAddress"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
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

export default InsertCourt;
