import { React, useState, useEffect } from "react";
import {
  addCase,
  getAllCourts,
  getAllCaseType,
  getAllAdvocates,
  getAllActs,
} from "../Services/Api";

const Addcase = ({ isOpen, onClose, closeAddCaseModel, editCaseData }) => {
  console.log("c", editCaseData);
  const [selectedValues, setSelectedValues] = useState({
    AttorneyId: "",
    AdvocateId: "",
    ActId: "",
    CourtId: localStorage.getItem("courtId"),
    CaseTypeId: "",
    RoleId: localStorage.getItem("userId"),
  });
  const [form, setForm] = useState({
    DateFiled: "",
    CnrNumber: "",
    Petitioner: "",
    Defendant: "",
    JudgeName: "",
    Description: "",
    CaseStatus: "",
    Judgment: "",
    Comments: "",
  });

  const [courts, setCourts] = useState([]);
  const [caseTypes, setCaseType] = useState([]);
  const [advocates, setAdvocate] = useState([]);
  const [acts, setActs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updateform, setUpdateForm] = useState({
    id: editCaseData ? (editCaseData.id ? editCaseData.id : "") : "",
    CnrNumber: editCaseData
      ? editCaseData.CnrNumber
        ? editCaseData.CnrNumber
        : ""
      : "",
    Petitioner: editCaseData
      ? editCaseData.Petitioner
        ? editCaseData.Petitioner
        : ""
      : "",
  });
  const getAllCourtsData = async () => {
    const allCourtsData = await getAllCourts();
    setCourts(allCourtsData);
  };

  const getAllCaseTypeData = async () => {
    const allCaseTypeData = await getAllCaseType();
    setCaseType(allCaseTypeData);
  };

  const getAllAdvocatesData = async () => {
    const allAdvocatesData = await getAllAdvocates();
    setAdvocate(allAdvocatesData);
  };

  const getAllActsData = async () => {
    const allActsData = await getAllActs();
    setActs(allActsData);
  };

  useEffect(() => {
    if (editCaseData) {
      setUpdateForm({
        id: editCaseData.id || "",
        name: editCaseData.CnrNumber || "",
        Description: editCaseData.Petitioner || "",
      });
    } else {
      // Clear the updateform when there's no editCaseTypeData
      setUpdateForm({
        id: "",
        name: "",
        Description: "",
      });
    }
  }, [editCaseData]);

  useEffect(() => {
    getAllCourtsData();
    getAllCaseTypeData();
    getAllAdvocatesData();
    getAllActsData();
  }, []);

  useEffect(() => {
    if (editCaseData) {
      setUpdateForm({
        id: editCaseData.id || "",
        name: editCaseData.CnrNumber || "",
        Description: editCaseData.Petitioner || "",
      });
    } else {
      // Clear the updateform when there's no editCaseTypeData
      setUpdateForm({
        id: "",
        name: "",
        Description: "",
      });
    }
  }, [editCaseData]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addCase(
      parseInt(selectedValues.CaseTypeId),
      parseInt(selectedValues.CourtId),
      parseInt(selectedValues.ActId),
      parseInt(selectedValues.AdvocateId),
      parseInt(selectedValues.AttorneyId),
      parseInt(selectedValues.RoleId),
      form
    );
    closeAddCaseModel();
  };

  useEffect(() => {
    if (editCaseData) {
      setUpdateForm({
        id: editCaseData.id || "",
        name: editCaseData.CnrNumber || "",
        Description: editCaseData.Petitioner || "",
      });
    } else {
      // Clear the updateform when there's no editCaseTypeData
      setUpdateForm({
        id: "",
        name: "",
        Description: "",
      });
    }
  }, [editCaseData]);
 console.log("editCaseData",editCaseData)
  if (editCaseData) {
    return (
      <>
        <div>
          <div
            className={`fixed z-50 left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="w-full">
              <div className=" flex justify-center">
                <div className="mx-3 md:mx-10 my-4 md:px-4 bg-white">
                  <div className="w-full p-8">
                    <div className="flex justify-center">
                      <h1 className="font-bold uppercase text-3xl dark:text-gray-800">
                        Edit case
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-1 md:gap-5 md:grid-cols-3 mt-1 dark:text-gray-800">
                      <div>
                        <label>DateFiled</label>
                        <input
                          defaultValue={form.DateFiled}
                          onChange={handleInputChange}
                          type="date"
                          name="DateFiled"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>CnrNumber</label>
                        <input
                          defaultValue={form.CnrNumber}
                          onChange={handleInputChange}
                          type="text"
                          name="CnrNumber"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>CaseType</label>
                        <select
                          id="caseType"
                          name="CaseTypeId"
                          defaultValue={form.CaseTypeId}
                          onChange={(e) =>
                            handleSelectChange("CaseTypeId", e.target.value)
                          }
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a Case Type</option>
                          {caseTypes.map((caseType, index) => (
                            <option key={index} value={caseType.id}>
                              {caseType.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div>
                    <label>Court Name</label>
                    <select
                      id="court"
                      name="CourtId"
                      defaultValue={form.CourtId}
                      onChange={(e) =>
                        handleSelectChange("CourtId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Court</option>
                      {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                          {court.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                      <div>
                        <label>Petitioner</label>
                        <input
                          defaultValue={form.Petitioner}
                          onChange={handleInputChange}
                          type="text"
                          name="Petitioner"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>Defendant</label>
                        <input
                          defaultValue={form.Defendant}
                          onChange={handleInputChange}
                          type="text"
                          name="Defendant"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>JudgeName</label>
                        <input
                          defaultValue={form.JudgeName}
                          onChange={handleInputChange}
                          type="text"
                          name="JudgeName"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>Description</label>
                        <input
                          defaultValue={form.Description}
                          onChange={handleInputChange}
                          type="text"
                          name="Description"
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div>
                        <label>Act Name</label>
                        <select
                          id="act"
                          name="ActId"
                          defaultValue={form.ActId}
                          onChange={(e) =>
                            handleSelectChange("ActId", e.target.value)
                          }
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a Acts</option>
                          {acts.map((act) => (
                            <option key={act.id} value={act.id}>
                              {act.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Advocate Name</label>
                        <select
                          id="advocate"
                          name="AdvocateId"
                          defaultValue={form.AdvocateId}
                          onChange={(e) =>
                            handleSelectChange("AdvocateId", e.target.value)
                          }
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a Advocate</option>
                          {advocates.map((advocate) => (
                            <option key={advocate.id} value={advocate.id}>
                              {advocate.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Attorney Name</label>
                        <select
                          id="attorney"
                          name="AttorneyId"
                          defaultValue={form.AttorneyId}
                          onChange={(e) =>
                            handleSelectChange("AttorneyId", e.target.value)
                          }
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select a Attorney</option>
                          {advocates.map((advocate) => (
                            <option key={advocate.id} value={advocate.id}>
                              {advocate.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>CaseStatus</label>
                        <select
                          id="caseStatus"
                          name="CaseStatus"
                          defaultValue={form.CaseStatus}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          <option value="Pending" selected>
                            Pending
                          </option>
                          <option value="Running">Running</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-x-3">
                      <button
                        onClick={handleSubmit}
                        className="uppercase text-sm font-bold tracking-wide bg-indigo-500 hover:bg-indigo-600 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        Add case
                      </button>
                      <button
                        onClick={closeAddCaseModel}
                        className="uppercase text-sm font-bold tracking-wide border border-indigo-600 text-indigo-600 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div
        className={`fixed z-50 left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="w-full">
          <div className=" flex justify-center">
            <div className="mx-3 md:mx-10 my-4 md:px-4 bg-white">
              <div className="w-full p-8">
                <div className="flex justify-center">
                  <h1 className="font-bold uppercase text-3xl dark:text-gray-800">
                    Add case
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-1 md:gap-5 md:grid-cols-3 mt-1 dark:text-gray-800">
                  <div>
                    <label>DateFiled</label>
                    <input
                      defaultValue={form.DateFiled}
                      onChange={handleInputChange}
                      type="date"
                      name="DateFiled"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>CnrNumber</label>
                    <input
                      defaultValue={form.CnrNumber}
                      onChange={handleInputChange}
                      type="text"
                      name="CnrNumber"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>CaseType</label>
                    <select
                      id="caseType"
                      name="CaseTypeId"
                      defaultValue={form.CaseTypeId}
                      onChange={(e) =>
                        handleSelectChange("CaseTypeId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Case Type</option>
                      {caseTypes.map((caseType, index) => (
                        <option key={index} value={caseType.id}>
                          {caseType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div>
                    <label>Court Name</label>
                    <select
                      id="court"
                      name="CourtId"
                      defaultValue={form.CourtId}
                      onChange={(e) =>
                        handleSelectChange("CourtId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Court</option>
                      {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                          {court.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  <div>
                    <label>Petitioner</label>
                    <input
                      defaultValue={form.Petitioner}
                      onChange={handleInputChange}
                      type="text"
                      name="Petitioner"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>Defendant</label>
                    <input
                      defaultValue={form.Defendant}
                      onChange={handleInputChange}
                      type="text"
                      name="Defendant"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>JudgeName</label>
                    <input
                      defaultValue={form.JudgeName}
                      onChange={handleInputChange}
                      type="text"
                      name="JudgeName"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <input
                      defaultValue={form.Description}
                      onChange={handleInputChange}
                      type="text"
                      name="Description"
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div>
                    <label>Act Name</label>
                    <select
                      id="act"
                      name="ActId"
                      defaultValue={form.ActId}
                      onChange={(e) =>
                        handleSelectChange("ActId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Acts</option>
                      {acts.map((act) => (
                        <option key={act.id} value={act.id}>
                          {act.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Advocate Name</label>
                    <select
                      id="advocate"
                      name="AdvocateId"
                      defaultValue={form.AdvocateId}
                      onChange={(e) =>
                        handleSelectChange("AdvocateId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Advocate</option>
                      {advocates.map((advocate) => (
                        <option key={advocate.id} value={advocate.id}>
                          {advocate.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Attorney Name</label>
                    <select
                      id="attorney"
                      name="AttorneyId"
                      defaultValue={form.AttorneyId}
                      onChange={(e) =>
                        handleSelectChange("AttorneyId", e.target.value)
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Attorney</option>
                      {advocates.map((advocate) => (
                        <option key={advocate.id} value={advocate.id}>
                          {advocate.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>CaseStatus</label>
                    <select
                      id="caseStatus"
                      name="CaseStatus"
                      defaultValue={form.CaseStatus}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="Pending" selected>
                        Pending
                      </option>
                      <option value="Running">Running</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex gap-x-3">
                  <button
                    onClick={handleSubmit}
                    className="uppercase text-sm font-bold tracking-wide bg-indigo-500 hover:bg-indigo-600 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Add case
                  </button>
                  <button
                    onClick={closeAddCaseModel}
                    className="uppercase text-sm font-bold tracking-wide border border-indigo-600 text-indigo-600 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Addcase;
