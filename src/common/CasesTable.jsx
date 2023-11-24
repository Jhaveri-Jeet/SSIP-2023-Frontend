import React, { useEffect, useState } from "react";
import InsertAdvocate from "../Modals/InsertAdvocate";
import Addcase from "../Modals/Addcase";
import AddSections from "../Modals/AddSections";
import InsertHearing from "../Modals/InsertHearing";
import InsertCourt from "../Modals/InsertCourt";
import InsertState from "../Modals/InsertState";
import InsertDistrict from "../Modals/InsertDistrict";
import CustomPagination from "./CustomPagination";

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
  getDistrict,
  getSingleHearing,
  getSingleEvidence,
  getSingleWitness,
  
} from "../Services/Api";
import { addWitness } from "../Services/Api";
import AddCaseType from "../Modals/AddCaseType";
import InsertActs from "../Modals/InsertActs";
import { useNavigate } from "react-router-dom";
import InsertWitness from "../Modals/InsertWitness";
import InsertEvidence from "../Modals/InsertEvidence";
import InsertUsers from "../Modals/InsertUsers";
import { prefixUrl, tokenData } from "../Services/Config";

function CasesTable({
  tableName,
  cases,
  HearingDetail,
  Evidence,
  Witness,
  CaseId,
  Courts,
  Users,
  Advocates,
  Acts,
  CaseType,
  States,
  Districts,
  sections,
  getAllUsersData,
  getAllCourtsData,
  getAllStatesData,
  getAllDistrictsData,
}) {
  //pagination code -> om

  // all useState
  const [filteredCases, setFilteredCases] = useState(cases);
  const [filteredCourts, setFilteredCourts] = useState(Courts);
  const [filteredAdvocates, setFilteredAdvocates] = useState(Advocates);
  const [filteredActs, setFilteredActs] = useState(Acts);
  const [filteredCasetype, setFilteredCasetype] = useState(CaseType);
  const [filteredStates, setFilteredStates] = useState(States);
  const [filteredDistricts, setFilteredDistricts] = useState(Districts);
  const [filteredSection, setFilteredSection] = useState(sections);

  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(10); // Number pagesize
  const [TotalPage, setTotalPage] = useState(0);

  const handlePagination = (data) => {
    if (data) {
      const indexOfLastCase = currentPage * PageSize;
      const indexOfFirstCase = indexOfLastCase - PageSize;
      const totalPages = Math.ceil(data.length / PageSize);
      setTotalPage(totalPages);

      return data.slice(indexOfFirstCase, indexOfLastCase);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentData = async (data, setStateFunction) => {
    const currentdata = handlePagination(data);
    console.log("currentdata", currentdata);
    setStateFunction(currentdata);
  };

  useEffect(() => {
    if (cases) {
      getCurrentData(cases, setFilteredCases);
    }
    if (Courts) {
      getCurrentData(Courts, setFilteredCourts);
    }
    if (Advocates) {
      getCurrentData(Advocates, setFilteredAdvocates);
    }
    if (Acts) {
      getCurrentData(Acts, setFilteredActs);
    }
    if (CaseType) {
      getCurrentData(CaseType, setFilteredCasetype);
    }
    if (States) {
      getCurrentData(States, setFilteredStates);
    }
    if (Districts) {
      getCurrentData(Districts, setFilteredDistricts);
    }
    if (sections) {
      getCurrentData(sections, setFilteredSection);
    }
  }, [
    cases,
    Courts,
    Advocates,
    CaseType,
    Acts,
    States,
    Districts,
    sections,
    currentPage,
  ]); // Include currentPage as a dependency

  const casesearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the cases array based on the search term
    const filtered = cases.filter((caseItem) => {
      // Define an array of fields to search in
      const fieldsToSearch = [
        "cnrNumber",
        "petitioner",
        "defendant",
        "advocate.name",
        "attorney.name",
        "transferTo.name",
        "act.name",
        "court.name",
        "caseType.name",
        "caseStatus",
      ];

      // Check if the search term is present in any of the specified fields
      return fieldsToSearch.some((field) =>
        deepSearch(caseItem, field, searchTerm)
      );
    });

    // console.log(searchTerm, filtered);
    // Update the filteredCases state

    const currentCases = handlePagination(filtered);

    setFilteredCases(currentCases);
  };

  const CommonSearch = (data, setStateFunction) => (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filtered = data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });

    // console.log(searchTerm, filtered);

    const currentCases = handlePagination(filtered);

    setStateFunction(currentCases);
  };

  // All Search function for  all components
  const handleCourtSearch = CommonSearch(Courts, setFilteredCourts);
  const handleAdvocateSearch = CommonSearch(Advocates, setFilteredAdvocates);
  const handleActsSearch = CommonSearch(Acts, setFilteredActs);
  const handleStatesSearch = CommonSearch(States, setFilteredStates);
  const handleCaseTypeSearch = CommonSearch(CaseType, setFilteredCasetype);
  const handleDistrictSearch = CommonSearch(Districts, setFilteredDistricts);
  const handleSectionSearch = CommonSearch(sections, setFilteredSection);

  // Recursive function to search through nested objects based on specified field

  const deepSearch = (obj, field, term) => {
    const keys = field.split(".");

    for (const key of keys) {
      obj = obj[key];
      if (obj === undefined) {
        return false;
      }
    }

    // Check if the string representation of the value includes the search term
    return String(obj).toLowerCase().includes(term);
  };

  //end pagination code

  // const [isOpenForHearing, setIsOpenForHearnig] = useState(false);
  // const [isOpenForEvidence, setIsOpenForEvidence] = useState(false);
  // const [isOpenForWitness, setIsOpenForWitness] = useState(false);

  const userRoleId = tokenData.role;
  const userCourtId = tokenData.courtId;
  const [isOpen, setIsOpen] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const navigate = useNavigate();

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
    const res = await getSingleHearing(e);
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
  //---------------operation for Evidence ----------------------
  const [editEvidence, setEditEvidence] = useState([]);
  const [isEvidenceOpen, setEvidenceOpen] = useState(false);
  const closeEvidenceModel = () => {
    setEvidenceOpen(false);
    setIsOpen(false);
  };
  const edit_Evidence = async (e) => {
    const res = await getSingleEvidence(e);
    setEditEvidence(res);
    console.log("updata res", res);
    setIsOpen(true);
  };
  const delete_Evidence = async (e) => {
    const deleteEvidenceId = e;
    let isdelete = confirm("Are you sure you want to delete");
    if (isdelete) {
      const res = await deleteEvidence(deleteEvidenceId);
    }
  };
  //---------------operation for Witness ----------------------
  const [editWitness, setEditWitness] = useState([]);
  const [isWitnessOpen, setWitnessOpen] = useState(false);
  const closeWitnessModel = () => {
    setWitnessOpen(false);
    setIsOpen(false);
  };
  const edit_Witness = async (e) => {
    const res = await getSingleWitness(e);
    setEditWitness(res);
    console.log("updata res", res);
    setIsOpen(true);
  };
  const delete_Witness = async (e) => {
    const deleteWitnessId = e;
    let isdelete = confirm("Are you sure you want to delete");
    if (isdelete) {
      const res = await deleteWitness(deleteWitnessId);
    }
  };

  // ------------------ operations for User ---------------------

  const editSingleUser = async (e) => {
    const res = await getUser(e);
    setEditSingleUserData(res);
    setIsOpen(true);
  };

  const [editsingleUserData, setEditSingleUserData] = useState([]);

  const closeSingleUserTypeModel = () => {
    setIsOpen(false);
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
    console.log(res);
    setEditSingleActData(res);
    setIsOpen(true);
  };

  if (cases) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={casesearch}
                    type="text"
                    style={{maxWidth:'260px'}}
                    name="Search"
                    placeholder="Search"
                    className="inputbox outline-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                      <div className="font-semibold text-center">Attorney</div>
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
                      <div className="font-semibold text-center">Status</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Report</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredCases
                    ? filteredCases.map((singleCase) => {
                        // console.log(
                        //   "edit",
                        //   userRoleId,
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
                                onClick={() =>
                                  navigate(
                                    `/dashboard/showCaseDetail/${singleCase.id}`
                                  )
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
                            {userCourtId == singleCase.transferToId && (
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
                            )}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                </tfoot>
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
            <h2 className="font-semibold text-xl text-slate-800 dark:text-slate-100 align-middle ">
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
                      <div className="font-semibold text-center">Date</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Details</div>
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
                                {/* <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() =>
                                      delete_Hearing(HearingDetailsData.id)
                                    }
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded"
                                  >
                                    <i className="m-2 fa-solid fa-trash"></i>
                                  </button>
                                </div> */}
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
        {/* <InsertHearing
          isOpen={isHearingOpen}
          onClose={closeHearingModel}
          caseId={CaseId}
        /> */}
      </>
    );
  }
  if (Evidence) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between ">
            <h2 className="font-semibold text-xl text-slate-800 dark:text-slate-100 align-middle ">
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
                      <div className="font-semibold text-center">
                        Description
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Image</div>
                    </th>
                    {/* <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th> */}
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Evidence
                    ? Evidence.map((Evidencedata) => {
                        return (
                          <tr key={Evidencedata.Id}>
                            <td className="p-2">
                              <div className="text-center text-emerald-500">
                                {Evidencedata.evidenceDescription}
                              </div>
                            </td>
                            <td className="p-2">
                              <button
                                className="flex justify-center text-center"
                                style={{ width: "100%" }}
                                onClick={() =>
                                  openInNewTab(
                                    `${prefixUrl}/EvidenceImages/${Evidencedata.evidenceImageName}`
                                  )
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
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertEvidence
          editeHearing={editWitness}
          isOpen={isOpen}
          onClose={closeEvidenceModel}
          caseId={CaseId}
        />
        {/* <InsertEvidence
          isOpen={isEvidenceOpen}
          onClose={closeEvidenceModel}
          caseId={CaseId}
        /> */}
      </>
    );
  }
  if (Witness) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between ">
            <h2 className="font-semibold text-xl text-slate-800 dark:text-slate-100 align-middle ">
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
                      <div className="font-semibold text-center">Name</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Image</div>
                    </th>
                    {/* <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th> */}
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Witness
                    ? Witness.map((singleWitness) => {
                        return (
                          <tr key={singleWitness.Id}>
                            <td className="p-2">
                              <div className="text-center text-emerald-500">
                                {singleWitness.witnessName}
                              </div>
                            </td>
                            <td className="p-2">
                              <button
                                className="flex justify-center text-center"
                                style={{ width: "100%" }}
                                onClick={() =>
                                  openInNewTab(
                                    `${prefixUrl}/WitnessImages/${singleWitness.witnessImage}`
                                  )
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
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertWitness
          editeHearing={editWitness}
          isOpen={isOpen}
          onClose={closeWitnessModel}
          caseId={CaseId}
        />
        {/* <InsertWitness
          isOpen={isWitnessOpen}
          onClose={closeWitnessModel}
          caseId={CaseId}
        /> */}
      </>
    );
  }
  if (Courts) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleCourtSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none  text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredCourts
                    ? filteredCourts.map((singleCourt) => {
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
                                    onClick={() =>
                                      editSingleCourt(singleCourt.id)
                                    }
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
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
  if (Users) {
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
                      <div className="font-semibold text-left">Username</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Court Name
                      </div>
                    </th>
                    {/* <th className="p-2">
                      <div className="font-semibold text-center">Actions</div>
                    </th> */}
                  </tr>
                </thead>
                {/* Table body */}

                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                  {Users
                    ? Users.map((singleUser) => {
                        return (
                          <tr key={singleUser.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {singleUser.userName}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {singleUser.court.name}
                              </div>
                            </td>
                            {/* <td className="p-2">
                              <div className="inline-flex items-center">
                                <div className="text-slate-800 dark:text-slate-100 ml-5">
                                  <button
                                    onClick={() => editSingleUser(singleUser.id)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </td> */}
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <InsertUsers
          editSingleUser={editsingleUserData}
          isOpen={isOpen}
          onClose={closeSingleCourtTypeModel}
          getAllUsersData={getAllUsersData}
        />
      </>
    );
  }
  if (Advocates) {
    return (
      <>
        <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleAdvocateSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none  text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredAdvocates
                    ? filteredAdvocates.map((singleAdvocate) => {
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
              </table>
            </div>
          </div>
          <div>
            <InsertAdvocate
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
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleActsSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none   text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredActs
                    ? filteredActs.map((singleAct) => {
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
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
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleCaseTypeSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none   text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredCasetype
                    ? filteredCasetype.map((item) => {
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
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
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleStatesSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none   text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredStates
                    ? filteredStates.map((singleState, index) => {
                        return (
                          <tr key={singleState.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {index + 1}
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
                                    onClick={() =>
                                      editSingleState(singleState.id)
                                    }
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
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
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleDistrictSearch}
                    type="text"
                    name="Search"
                    placeholder="Search"
                    className="inputbox outline-none w-56  text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredDistricts
                    ? filteredDistricts.map((singleDistrict, index) => {
                        return (
                          <tr key={singleDistrict.id}>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {index + 1}
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
                                    onClick={() =>
                                      editSingleDistrict(singleDistrict.id)
                                    }
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
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
        <header className="items-center justify-between  px-5 flex py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              {tableName}
            </h2>
            
                  <input
                    onChange={handleSectionSearch}
                    type="text"
                    name="Search"
                    style={{maxWidth:'260px'}}
                    placeholder="Search"
                    className="inputbox outline-none   text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
               
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
                  {filteredSection
                    ? filteredSection.map((item) => {
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
                <tfoot>
                  <tr>
                    <td colSpan={12}  >
                      <div className="w-full flex justify-end">

                      <CustomPagination
                        currentPage={currentPage}
                        totalPages={TotalPage}
                        onPageChange={onPageChange}
                      />
                      </div>
                    </td>
                  </tr>
                  </tfoot>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CasesTable;
