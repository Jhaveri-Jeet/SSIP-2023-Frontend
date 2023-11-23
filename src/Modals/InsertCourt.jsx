import { React, useState, useEffect } from "react";
import { getAllDistrict,getAllStates,getAllRoles,addCourt, updateCourt } from "../Services/Api";


function InsertCourt({ isOpen, onClose, editSingleCourt, getAllCourtsData }) {

  const [updateform, setUpdateForm] = useState({
    id: editSingleCourt ? (editSingleCourt.id ? editSingleCourt.id : "") : "",
    name: editSingleCourt ? (editSingleCourt.name ? editSingleCourt.name : "") : "",
    identificationNumber: editSingleCourt ? (editSingleCourt.identificationNumber ? editSingleCourt.identificationNumber : "") : "",
    fullAddress: editSingleCourt ? (editSingleCourt.fullAddress ? editSingleCourt.fullAddress : "") : "",
    roleId: editSingleCourt ? (editSingleCourt.roleId ? editSingleCourt.roleId : "") : "",
    role: editSingleCourt ? (editSingleCourt.role ? editSingleCourt.role : "") : "",
    stateId: editSingleCourt ? (editSingleCourt.stateId ? editSingleCourt.stateId : "") : "",
    state: editSingleCourt ? (editSingleCourt.state ? editSingleCourt.state : "") : "",
    districtId: editSingleCourt ? (editSingleCourt.districtId ? editSingleCourt.districtId : "") : "",
    district: editSingleCourt ? (editSingleCourt.district ? editSingleCourt.district : "") : "",

});

useEffect(() => {
  if (editSingleCourt) {
    setUpdateForm({
      id: editSingleCourt.id || "",
      name: editSingleCourt.name || "",
      identificationNumber: editSingleCourt.identificationNumber || "",
      fullAddress: editSingleCourt.fullAddress || "",
      roleId: editSingleCourt.roleId || "",
      role: editSingleCourt.role || "",
      stateId: editSingleCourt.stateId || "",
      state: editSingleCourt.state || "",
      districtId: editSingleCourt.districtId || "",
      district: editSingleCourt.district || "",
    });
  } else {
    setUpdateForm({
      id: "",
      name: "",
      identificationNumber:  "",
      fullAddress:  "",
      roleId:  "",
      role:  "",
      stateId:  "",
      state:  "",
      districtId:  "",
      district:  "",
    });
  }
}, [editSingleCourt]);

  const [districtDataList, setDistrictDataList] = useState([]);
  const [stateDataList, setStateDataList] = useState([]);
  const [userDataList, setuserDataList] = useState([]);

  const [form, setForm] = useState({
    name: "",
    identificationNumber:"",
    fullAddress: "",
    RoleId: "",
    StateId: "",
    DistrictId: "",
  });

  const [updateSelectedValues, setUpdateSelectedValues] = useState({
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
  const updatehandleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateform,
      [name]: value,
    });
  };
  const handleSelectChange = (name, value) => {
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };
  const updatehandleSelectChange = (name, value) => {
    setUpdateSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(e.target.textContent === "Edit") {
      const res = await updateCourt(editSingleCourt.id,updateform);
    }
    else if(e.target.textContent === "Add") {
      const res = await addCourt(form)
    }
    await getAllCourtsData();
    onClose();
  };

  useEffect(() => {
    getAllDistrict().then((response) => {
      return response;
    }).then((data) => {
      setDistrictDataList(prev=>{
        prev = data;
        return [...prev];
      })
    }).catch((error) => {
      console.error(error);
    });
    getAllStates().then((response) => {
      return response;
    }).then((data) => {
      setStateDataList(prev=>{
        prev = data;
        return [...prev];
      })
    }).catch((error) => {
      console.error(error);
    });
    getAllRoles().then((response) => {
      return response;
    }).then((data) => {
      setuserDataList(prev=>{
        prev = data;
        return [...prev];
      })
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  
  if(editSingleCourt)
  {
    return (<>
    <div
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-2xl">
          <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="grid grid-cols-1 gap-1 md:gap-5 md:grid-cols-3">
            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select Court Type:
                </label>
                <select
                  value={updateform.roleId}
                  onChange={(e) =>{
                    updatehandleSelectChange("RoleId", e.target.value)
                    setUpdateForm({
                      ...updateform,
                      "role" : {
                        "id": e.target.value,
                        "role": e.target.options[e.target.selectedIndex].id,
                      }
                    });
                  }
                }
                  id="roleId"
                  name="roleId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled>Select Court Type</option>
                  {userDataList.map((user) => (
                    <option key={user.id} value={user.id} id={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Court Name:
                </label>
                <input
                  defaultValue={updateform.name}
                  onChange={updatehandleInputChange}
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
                  defaultValue={updateform.identificationNumber}
                  onChange={updatehandleInputChange}
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
                <select
                  value={updateform.stateId}
                  onChange={(e) => {
                    updatehandleSelectChange("StateId", e.target.value)
                    setUpdateForm({
                      ...updateform,
                      "state" : {
                        "id": e.target.value,
                        "state": e.target.options[e.target.selectedIndex].id,
                      }
                    });
                  }}
                  id="state"
                  name="stateId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled>select state</option>
                  {stateDataList.map((state) => (
                    <option key={state.id} value={state.id} id={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select District:
                </label>
                <select
                  value={updateform.districtId}
                  onChange={(e) => {
                    updatehandleSelectChange("DistrictId", e.target.value)
                    setUpdateForm({
                      ...updateform,
                      "district" : {
                        "id": e.target.value,
                        "district": e.target.options[e.target.selectedIndex].id,
                      }
                    });
                  }}
                  id="district"
                  name="districtId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled>Select a district</option>
                  {districtDataList.map((district) => (
                    <option key={district.id} value={district.id} id={district.name}>
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
                  defaultValue={updateform.fullAddress}
                  onChange={updatehandleInputChange}
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
                  Edit
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
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-2xl">
          <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
            <div className="grid grid-cols-1 gap-1 md:gap-5 md:grid-cols-3">
            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select Court Type:
                </label>
                <select
                  defaultValue={form.RoleId}
                  onChange={handleInputChange}
                  id="roleId"
                  name="RoleId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled selected>Select Court Type</option>
                  {userDataList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
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
                <select
                  defaultValue={form.StateId}
                  onChange={handleInputChange}
                  id="state"
                  name="StateId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled selected>select state</option>
                  {stateDataList.map((state) => (
                    <option key={state.id} value={state.id} id={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Select District:
                </label>
                <select
                  defaultValue={form.DistrictId}
                  onChange={handleInputChange}
                  id="district"
                  name="DistrictId"
                  className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option value="" disabled selected>Select a district</option>
                  {districtDataList.map((district) => (
                    <option key={district.id} value={district.id}>
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
