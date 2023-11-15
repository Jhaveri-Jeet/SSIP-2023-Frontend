import React, { useState } from "react";
import AddWitness from "../Modals/AddWitness";
import InsertAdvocate from "../Modals/InsertAdvocate";
import Addcase from "../Modals/Addcase";
import AddSections from "../Modals/AddSections";
import InsertHearing from "../Modals/InsertHearing";
import InsertCourt from "../Modals/InsertCourt";
import InsertState from "../Modals/InsertState";
import InsertDistrict from "../Modals/InsertDistrict";

import {
  deleteCaseType,
  updateCase,
  getCaseType,
  deleteAct,
  getAct,
  getCase,
  getAllActs,
  getHearing,
  deleteHearing,
  getAdvocate,
  deleteAdvocate,
  getSection,
  getCourt,
  getState,
  getDistrict
} from "../Services/Api";
import { addWitness } from "../Services/Api";
import AddCaseType from "../Modals/AddCaseType";
import InsertActs from "../Modals/InsertActs";
import { useNavigate } from "react-router-dom";

function CasesTable({
  userId,
  tableName,
  cases,
  HearingDetail,
  Evidence,
  CaseId,
  Courts,
  Advocates,
  Acts,
  CaseType,
  States,
  Districts,
  validate,
  sections,
  getAllCourtsData,
  getAllStatesData,
  getAllDistrictsData
}) {
  // alert(localStorage.getItem('isLoggedIn'));
  // validate()

  const [addWitnessOpen, setAddWitnessOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const [witnessData, setWitnessData] = useState({
    witnessName: "",
  });

  const formData = new FormData();

  const onSubmitWitnessForm = async (data) => {
    // setWitnessData(data);
    // console.log(witnessData)
    // formData.append("witnessName", data.witnessName);
    formData.append("witnessImage", data.witnessImage);
    console.log(data);
    const res = await addWitness(data, 1);
    console.log(res);
  };

  const closeWitness = () => {
    setAddWitnessOpen(false);
  };

  // ------------------ operations for Case ------------------
  const [editCaseData, setEditCaseData] = useState();

  const editCase = async (e) => {
    const res = await getCase(e);
    setEditCaseData(res);
    setIsOpen(true);
  };
  const closeCaseModel = () => {
    setIsOpen(false);
  };
  // ------------------ operations for CaseType ------------------

  const [editCaseTypeData, setEditCaseTypeData] = useState([]);

  const closeCaseTypeModel = () => {
    setIsOpen(false);
  };
  const deleteCasetype = async (e) => {
    const deleteCaseTypeId = e;
    const res = await deleteCaseType(deleteCaseTypeId);
  };
  const editCasetype = async (e) => {
    const res = await getCaseType(e);
    setEditCaseTypeData(res);
    setIsOpen(true);
  };
  //---------------operation for Hearing ----------------------
  const [editHearing, setEditHearing] = useState([]);
  const [isHearingOpen, setHearingOpen] = useState(false);
  const closeHearingModel = () => {
    setHearingOpen(false);
    setIsOpen(false);
  };
  const edit_Hearing = async (e) => {
    const res = await getHearing(e);
    setEditHearing(res);
    console.log("updata res", res);
    setIsOpen(true);
  };
  const delete_Hearing = async (e) => {
    const deleteHearingId = e;
    let isdelete = confirm("Are you sure you want to delete");
    if (isdelete) {
      const res = await deleteHearing(deleteHearingId);
    }
  };
  
  // ------------------ operations for Court ---------------------

  const editSingleCourt = async (e) => {
    const res = await getCourt(e);
    setEditSingleCourtData(res);
    setIsOpen(true);
  };

  const [editsingleCourtData, setEditSingleCourtData] = useState([]);

  const closeSingleCourtTypeModel = () => {
    setIsOpen(false);
  };

  //---------------operation for Advocate ----------------------
  const [editAdvocate, setEditAdvocate] = useState([]);
  const closeAdvocateModel = () => {
    setIsOpen(false);
  };
  const edit_Advocate = async (e) => {
    const res = await getAdvocate(e);
    setEditAdvocate(res.data);
    // console.log(res.data,editAdvocate);
    setIsOpen(true);
  };
  const delete_Advocate = async (e) => {
    const deleteAdvocateId = e;
    const res = await deleteAdvocate(deleteAdvocateId);
  };
  //--------------- operation for State ----------------------

  const [editsingleStateData, setEditSingleStateData] = useState([]);

  const closeSingleStateTypeModel = () => {
    setIsOpen(false);
  };

  const editSingleState = async (e) => {
    const res = await getState(e);
    setEditSingleStateData(res);
    setIsOpen(true);
  };

  //--------------- operation for District ----------------------

  const [editsingleDistrictData, setEditSingleDistrictData] = useState([]);

  const closeSingleDistrictTypeModel = () => {
    setIsOpen(false);
  };

  const editSingleDistrict = async (e) => {
    const res = await getDistrict(e);
    setEditSingleDistrictData(res);
    setIsOpen(true);
  };

  // ------------------ operations for singleAct ------------------

  const [editsingleActData, setEditSingleActData] = useState([]);

  const closeSingleActTypeModel = () => {
    setIsOpen(false);
  };
  const deleteSingleAct = async (e) => {
    const deleteCaseTypeId = e;
    const res = await deleteAct(deleteCaseTypeId);
  };
  const editSingleAct = async (e) => {
    const res = await getAct(e);

    setAllActs(acts);
    setIsOpen(true);
  };
  
  if (cases) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Number</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">File</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Type</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Advocate</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Attorney
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Defendant</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Petitioner
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Transfer To
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Status
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Report
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {cases
                    ? cases.map((singleCase) => {
                      // console.log(
                      //   "edit",
                      //   localStorage.getItem("userId"),
                      //   singleCase.roleId,
                      //   singleCase.transferToId
                      // );
                      return (
                        <tr key={singleCase.id}>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">
                                {singleCase.cnrNumber}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {singleCase.dateFiled}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {singleCase.caseType.name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {singleCase.advocate.name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-sky-500">
                              {singleCase.attorney.name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {singleCase.defendant}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {singleCase.petitioner}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {singleCase.transferTo.name}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {singleCase.caseStatus}
                            </div>
                          </td>
                          <td className="p-2">
                            <button
                              className="flex justify-center text-center"
                              style={{ width: "100%" }}
                              onClick={() => hadndleSendId(singleCase.id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                fill="currentColor"
                                className="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                {" "}
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                              </svg>
                            </button>
                          </td>
                          {/* {(localStorage.getItem("userId") ==
                              singleCase.roleId ||
                              localStorage.getItem("userId") ==
                                singleCase.transferToId) && ( */}
                          <td className="p-2">
                            <div className="inline-flex items-center">
                              <div className="text-slate-800 dark:text-slate-100 ml-5">
                                <button
                                  onClick={() => editCase(singleCase.id)}
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </td>
                          {/* )} */}
                        </tr>
                      );
                    })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Addcase
          editCaseData={editCaseData}
          isOpen={isOpen}
          onClose={closeCaseModel}
        />
      </>
    );
  }
  if (HearingDetail) {
    return (
      <>
        <div className=" col-span-full xl:col-span-12  bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between ">
            <h2
              style={{ fontSize: "20px" }}
              className="font-semibold text-slate-800 dark:text-slate-100 align-middle "
            >
              {tableName}
            </h2>
            <button
              onClick={() => {
                setHearingOpen(true);
              }}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add Hearing</span>
            </button>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-center">Case Id</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Hearing date
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        HearingDetails
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {HearingDetail
                    ? HearingDetail.map((HearingDetailsData, index) => {
                        return (
                          <tr key={index}>
                            <td className="p-2">
                              <div className="text-center">
                                {HearingDetailsData.caseId}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-emerald-500">
                                {HearingDetailsData.hearingDate}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {HearingDetailsData.hearingDetails}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className=" flex justify-center  items-center">
                                <div className="text-slate-800 dark:text-slate-100 ">
                                  <button
                                    onClick={() => {
                                      edit_Hearing(HearingDetailsData.id);
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold  rounded"
                                  >
                                    <i className="m-2 fa-solid fa-edit"></i>
                                  </button>
                                </div>
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() =>
                                      delete_Hearing(HearingDetailsData.id)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded"
                                  >
                                    <i className="m-2 fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <InsertHearing
          editeHearing={editHearing}
          isOpen={isOpen}
          onClose={closeHearingModel}
          caseId={CaseId}
        />
        <InsertHearing
          isOpen={isHearingOpen}
          onClose={closeHearingModel}
          caseId={CaseId}
        />
      </>
    );
  }
  if (Evidence) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between ">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 align-middle ">
              {tableName}
            </h2>
            <button
              onClick={() => {
                setAddWitnessOpen(true);
              }}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <svg
                className="w-4 h-4 fill-current opacity-50 shrink-0"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Add view</span>
            </button>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-center">Case Id</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Evidence description
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Image</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Evidence
                    ? Evidence.map((Evidencedata) => {
                        return (
                          <tr key={Evidencedata.Id}>
                            <td className="p-2">
                              <div className="text-center">
                                {Evidencedata.CaseId}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-emerald-500">
                                {Evidencedata.EvidenceDescription}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                Image is loading...
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddWitness
          validate={validate}
          isOpen={addWitnessOpen}
          onClose={closeWitness}
          onSubmitForm={onSubmitWitnessForm}
        />
      </>
    );
  }
  if (Courts) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Identification Number
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Address</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Courts
                    ? Courts.map((singleCourt) => {
                        return (
                          <tr key={singleCourt.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleCourt.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {singleCourt.identificationNumber}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-emerald-500">
                                {singleCourt.fullAddress}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => editSingleCourt(singleCourt.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertCourt
          editSingleCourt={editsingleCourtData}
          isOpen={isOpen}
          onClose={closeSingleCourtTypeModel}
          getAllCourtsData={getAllCourtsData}
        />
      </>
    );
  }

  if (Advocates) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Enrollment Number
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Advocates
                    ? Advocates.map((singleAdvocate) => {
                        return (
                          <tr key={singleAdvocate.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleAdvocate.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {singleAdvocate.enrollmentNumber}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex justify-center  items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  <button
                                    onClick={() =>
                                      delete_Advocate(singleAdvocate.id)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded"
                                  >
                                    <i className="m-2 fa-solid fa-trash"></i>
                                  </button>
                                </div>
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => {
                                      edit_Advocate(singleAdvocate.id);
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold  rounded"
                                  >
                                    <i className="m-2 fa-solid fa-edit"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <InsertAdvocate
              validate={validate}
              editAdvocateData={editAdvocate}
              isOpen={isOpen}
              onClose={closeAdvocateModel}
            />
          </div>
        </div>
      </>
    );
  }

  if (Acts) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Description</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Acts
                    ? Acts.map((singleAct) => {
                        return (
                          <tr key={singleAct.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleAct.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleAct.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  <button
                                    onClick={() =>
                                      deleteSingleAct(singleAct.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => editSingleAct(singleAct.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertActs
          editSingleAct={editsingleActData}
          isOpen={isOpen}
          onClose={closeSingleActTypeModel}
        />
      </>
    );
  }
  if (CaseType) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Case Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">
                        Case Description
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {CaseType
                    ? CaseType.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  <button
                                    onClick={() => deleteCasetype(item.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button onClick={() => editCasetype(item.id)}>
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddCaseType
          editCaseTypeData={editCaseTypeData}
          isOpen={isOpen}
          onClose={closeCaseTypeModel}
        />
      </>
    );
  }

  if (States) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Sr No.</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">State</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {States
                    ? States.map((singleState,index) => {
                        return (
                          <tr key={singleState.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {index+1}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleState.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => editSingleState(singleState.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertState
          editSingleState={editsingleStateData}
          isOpen={isOpen}
          onClose={closeSingleStateTypeModel}
          getAllStatesData={getAllStatesData}
        />
      </>
    );
  }

  if (Districts) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Sr No.</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">District</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Districts
                    ? Districts.map((singleDistrict,index) => {
                        return (
                          <tr key={singleDistrict.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {index+1}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleDistrict.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => editSingleDistrict(singleDistrict.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertDistrict
          editSingleDistrict={editsingleDistrictData}
          isOpen={isOpen}
          onClose={closeSingleDistrictTypeModel}
          getAllDistrictsData={getAllDistrictsData}
        />
      </>
    );
  }
  if (sections) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full dark:text-slate-300">
                {/* Table header */}
                <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Description</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Act type</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {sections
                    ? sections.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.act.name}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CasesTable;
