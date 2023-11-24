import { React, useState, useEffect } from "react";
import { tokenData } from "../Services/Config";
import {
  addCase,
  updateCase,
  getAllCaseType,
  getAllAdvocates,
  getAllActs,
  getAllTransferHighCourts,
  getAllTransferSupremeCourts,
} from "../Services/Api";

const Addcase = ({ isOpen, onClose, editCaseData }) => {
  const userRoleId = tokenData.role;
  const userCourtId = tokenData.courtId;
  const userLoginRoleId = 1;
  const userLoginHighRoleId = 3;
  const [transferCourts, setTransferCourts] = useState([]);
  const [transferSupremeCourts, setTransferSupremeCourts] = useState([]);
  const [caseTypes, setCaseType] = useState([]);
  const [advocates, setAdvocate] = useState([]);
  const [acts, setActs] = useState([]);

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
    AttorneyId: "",
    AdvocateId: "",
    ActId: "",
    CourtId: userCourtId,
    CaseTypeId: "",
    RoleId: userRoleId,
  });
  const [updateform, setUpdateForm] = useState({
    id: "",
    dateFiled: "",
    cnrNumber: "",
    petitioner: "",
    defendant: "",
    judgeName: "",
    description: "",
    caseStatus: "",
    judgment: "",
    comments: "",
    caseTypeId: "",
    courtId: userCourtId,
    actId: "",
    advocateId: "",
    attorneyId: "",
    roleId: userRoleId,
    transferFromId: userCourtId,
    transferToId: "",
  });

  const getAllTransferHighCourtsData = async () => {
    const allTransferCourtsData = await getAllTransferHighCourts();
    setTransferCourts(allTransferCourtsData);
  };
  const getAllTransferSupremeCourtsData = async () => {
    const allTransferCourtsData = await getAllTransferSupremeCourts();
    setTransferSupremeCourts(allTransferCourtsData);
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
    getAllTransferSupremeCourtsData();
    getAllTransferHighCourtsData();
    getAllCaseTypeData();
    getAllAdvocatesData();
    getAllActsData();
  }, []);

  useEffect(() => {
    if (editCaseData) {
      setUpdateForm({
        id: editCaseData.id || "",
        dateFiled: editCaseData.dateFiled || "",
        cnrNumber: editCaseData.cnrNumber || "",
        petitioner: editCaseData.petitioner || "",
        defendant: editCaseData.defendant || "",
        judgeName: editCaseData.judgeName || "",
        description: editCaseData.description || "",
        caseStatus: editCaseData.caseStatus || "",
        judgment: editCaseData.judgment || "",
        comments: editCaseData.comments || "",
        caseTypeId: editCaseData.caseTypeId || "",
        courtId: editCaseData.courtId || "",
        actId: editCaseData.actId || "",
        advocateId: editCaseData.advocateId || "",
        attorneyId: editCaseData.attorneyId || "",
        roleId: editCaseData.roleId || "",
        transferFromId: editCaseData.transferFromId || "",
        transferToId: editCaseData.transferToId || "",
      });
    } else {
      // Clear the updateform when there's no editCaseTypeData
      setUpdateForm({
        id: "",
        dateFiled: "",
        cnrNumber: "",
        petitioner: "",
        defendant: "",
        judgeName: "",
        description: "",
        caseStatus: "",
        judgment: "",
        comments: "",
        caseTypeId: "",
        courtId: "",
        actId: "",
        advocateId: "",
        attorneyId: "",
        roleId: "",
        transferFromId: "",
        transferToId: "",
      });
    }
  }, [editCaseData]);

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const updatehandleInputChange = (name, value) => {
    setUpdateForm({
      ...updateform,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addCase(form);
    setForm({
      DateFiled: "",
      CnrNumber: "",
      Petitioner: "",
      Defendant: "",
      JudgeName: "",
      Description: "",
      CaseStatus: "",
      Judgment: "",
      Comments: "",
      AttorneyId: "",
      AdvocateId: "",
      ActId: "",
      CourtId: userCourtId,
      CaseTypeId: "",
      RoleId: userRoleId,
    });
    onClose();
  };

  const updatehandleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCase(updateform);
    onClose();
  };

  if (editCaseData) {
    return (
      <>
        <div
          className={`w-full min-h-screen lg:h-screen bg-black bg-opacity-50 transition duration-150 ease-in-out z-50 fixed overflow-y-auto top-0 right-0 bottom-0 left-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative lg:mx-auto md:mx-4 flex items-center justify-center lg:w-4/6 2xl:h-screen py-2">
            <div className="h-auto relative rounded-xl bg-clip-border text-gray-700 shadow-lg bg-white p-4">
              <div className="flex justify-center">
                <h1 className="font-bold uppercase text-3xl dark:text-gray-800">
                  Edit case
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-1 md:gap-5 md:grid-cols-3 mt-1 dark:text-gray-800">
                <div>
                  <label>DateFiled</label>
                  <input
                    onChange={(e) =>
                      updatehandleInputChange("dateFiled", e.target.value)
                    }
                    value={updateform.dateFiled || editCaseData.dateFiled}
                    type="date"
                    name="dateFiled"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>CnrNumber</label>
                  <input
                    value={updateform.cnrNumber || editCaseData.cnrNumber}
                    onChange={(e) =>
                      updatehandleInputChange("cnrNumber", e.target.value)
                    }
                    type="text"
                    name="CnrNumber"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>CaseType</label>
                  <select
                    id="caseType"
                    name="caseTypeId"
                    value={updateform.caseTypeId || editCaseData.caseType.id}
                    onChange={(e) =>
                      updatehandleInputChange(
                        "caseTypeId",
                        parseInt(e.target.value)
                      )
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
                <div>
                  <label>Petitioner</label>
                  <input
                    value={updateform.petitioner || editCaseData.petitioner}
                    onChange={(e) =>
                      updatehandleInputChange("petitioner", e.target.value)
                    }
                    type="text"
                    name="petitioner"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>Defendant</label>
                  <input
                    onChange={(e) =>
                      updatehandleInputChange("defendant", e.target.value)
                    }
                    value={updateform.defendant || editCaseData.defendant}
                    type="text"
                    name="defendant"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>JudgeName</label>
                  <input
                    value={updateform.judgeName || editCaseData.judgeName}
                    onChange={(e) =>
                      updatehandleInputChange("judgeName", e.target.value)
                    }
                    type="text"
                    name="judgeName"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    value={updateform.description || editCaseData.description}
                    onChange={(e) =>
                      updatehandleInputChange("description", e.target.value)
                    }
                    type="text"
                    name="description"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>Comments</label>
                  <input
                    value={updateform.comments || editCaseData.comments}
                    onChange={(e) =>
                      updatehandleInputChange("comments", e.target.value)
                    }
                    type="text"
                    name="comments"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>Judgment</label>
                  <input
                    value={updateform.judgment || editCaseData.judgment}
                    onChange={(e) =>
                      updatehandleInputChange("judgment", e.target.value)
                    }
                    type="text"
                    name="judgment"
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label>Act Name</label>
                  <select
                    id="act"
                    name="actId"
                    value={updateform.actId || editCaseData.act.id}
                    onChange={(e) =>
                      updatehandleInputChange("actId", parseInt(e.target.value))
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
                    name="advocateId"
                    value={updateform.advocateId || editCaseData.advocate.id}
                    onChange={(e) =>
                      updatehandleInputChange(
                        "advocateId",
                        parseInt(e.target.value)
                      )
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
                    name="attorneyId"
                    value={updateform.attorneyId || editCaseData.attorney.id}
                    onChange={(e) =>
                      updatehandleInputChange(
                        "attorneyId",
                        parseInt(e.target.value)
                      )
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
                    name="caseStatus"
                    value={updateform.caseStatus || editCaseData.caseStatus}
                    onChange={(e) =>
                      updatehandleInputChange("caseStatus", e.target.value)
                    }
                    className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Running">Running</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                {userRoleId == userLoginRoleId && (
                  <div>
                    <label>Transfer To:</label>
                    <select
                      id="transferToId"
                      name="transferToId"
                      value={updateform.transferToId || editCaseData.roleId.id}
                      onChange={(e) =>
                        updatehandleInputChange(
                          "transferToId",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Courts</option>
                      {transferCourts.map((transferCourt, index) => (
                        <option key={index} value={transferCourt.id}>
                          {transferCourt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {userRoleId == userLoginHighRoleId && (
                  <div>
                    <label>Transfer To:</label>
                    <select
                      id="transferToId"
                      name="transferToId"
                      value={updateform.transferToId || editCaseData.roleId.id}
                      onChange={(e) =>
                        updatehandleInputChange(
                          "transferToId",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a Courts</option>
                      {transferSupremeCourts.map((transferCourt, index) => (
                        <option key={index} value={transferCourt.id}>
                          {transferCourt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-x-3">
                <button
                  onClick={updatehandleSubmit}
                  className="uppercase text-sm font-bold tracking-wide bg-indigo-500 hover:bg-indigo-600 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Edit case
                </button>
                <button
                  onClick={onClose}
                  className="uppercase text-sm font-bold tracking-wide border border-indigo-600 text-indigo-600 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
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
        className={`w-full min-h-screen lg:h-screen bg-black bg-opacity-50 transition duration-150 ease-in-out z-50 fixed overflow-y-auto top-0 right-0 bottom-0 left-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative lg:mx-auto md:mx-4 flex items-center justify-center lg:w-4/6 lg:h-screen py-2">
          <div className="h-auto relative rounded-xl bg-clip-border text-gray-700 shadow-lg bg-white p-4">
            <div className="flex justify-center">
              <h1 className="font-bold uppercase text-3xl dark:text-gray-800">
                Add case
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-1 md:gap-5 md:grid-cols-3 mt-1 dark:text-gray-800">
              <div>
                <label>DateFiled</label>
                <input
                  value={form.DateFiled}
                  onChange={(e) =>
                    handleInputChange("DateFiled", e.target.value)
                  }
                  type="date"
                  name="DateFiled"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>CnrNumber</label>
                <input
                  value={form.CnrNumber}
                  onChange={(e) =>
                    handleInputChange("CnrNumber", e.target.value)
                  }
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
                  value={form.CaseTypeId}
                  onChange={(e) =>
                    handleInputChange("CaseTypeId", parseInt(e.target.value))
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
              <div>
                <label>Petitioner</label>
                <input
                  value={form.Petitioner}
                  onChange={(e) =>
                    handleInputChange("Petitioner", e.target.value)
                  }
                  type="text"
                  name="Petitioner"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>Defendant</label>
                <input
                  value={form.Defendant}
                  onChange={(e) =>
                    handleInputChange("Defendant", e.target.value)
                  }
                  type="text"
                  name="Defendant"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>JudgeName</label>
                <input
                  value={form.JudgeName}
                  onChange={(e) =>
                    handleInputChange("JudgeName", e.target.value)
                  }
                  type="text"
                  name="JudgeName"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  value={form.Description}
                  onChange={(e) =>
                    handleInputChange("Description", e.target.value)
                  }
                  type="text"
                  name="Description"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label>Comments</label>
                <input
                  value={form.Comments}
                  onChange={(e) =>
                    handleInputChange("Comments", e.target.value)
                  }
                  type="text"
                  name="Comments"
                  className="w-full border border-gray-300 text-gray-900 mt-1 md:mt-3 p-2 rounded-lg focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label>Act Name</label>
                <select
                  id="act"
                  name="ActId"
                  value={form.ActId}
                  onChange={(e) =>
                    handleInputChange("ActId", parseInt(e.target.value))
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
                  value={form.AdvocateId}
                  onChange={(e) =>
                    handleInputChange("AdvocateId", parseInt(e.target.value))
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
                  value={form.AttorneyId}
                  onChange={(e) =>
                    handleInputChange("AttorneyId", parseInt(e.target.value))
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
            </div>
            <div className="mt-4 flex gap-x-3">
              <button
                onClick={handleSubmit}
                className="uppercase text-sm font-bold tracking-wide bg-indigo-500 hover:bg-indigo-600 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Add case
              </button>
              <button
                onClick={onClose}
                className="uppercase text-sm font-bold tracking-wide border border-indigo-600 text-indigo-600 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Addcase;
