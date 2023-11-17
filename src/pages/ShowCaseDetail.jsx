import { React, useState, useEffect } from "react";
import CasesTable from "../common/CasesTable";
import { useParams } from "react-router-dom";
import { getCaseDetails } from "../Services/Api";
import { NavLink } from "react-router-dom";
import InsertHearing from "../Modals/InsertHearing";
import InsertEvidence from "../Modals/InsertEvidence";
import InsertWitness from "../Modals/InsertWitness";

import { getHearing, getEvidences, getallEvidences, getWitnesses } from "../Services/Api";
const ShowCaseDetail = () => {
  const { caseid } = useParams();
  const [caseData, setCaseData] = useState([]);
  const [hearing, setHearing] = useState([]);
  const [evidences, setEvidences] = useState([]);
  const [witnesses, setWitnesses] = useState([]);

  const get_hearing = async (caseId) => {
    const res = await getHearing(caseId);
    setHearing(res);
    // console.log(hearing);
  };


  const get_evidences = async (caseId) => {
    const res = await getEvidences(caseId);
    console.log(res)
    setEvidences(res);
  };


  const get_witnesses = async (caseId) => {
    const res = await getWitnesses(caseId);
    setWitnesses(res);
  };

  const getCasedata = async () => {
    const response = await getCaseDetails(parseInt(caseid));
    setCaseData(response);
  };


  const [showOptions, setShowOptions] = useState(false);
  const [isHearingOpen, setIsHearingOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isWitnessOpen, setIsWitnessOpen] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };
  const handleShowHearing = () => {
    setShowOptions(false);
    setIsHearingOpen(true);
  };

  const handleShowEvidence = () => {
    setShowOptions(false);
    setIsEvidenceOpen(true);
  };

  const handleShowWitness = () => {
    setShowOptions(false);
    setIsWitnessOpen(true);
  };


  const closeform = () => {
    setIsHearingOpen(false);
    setIsEvidenceOpen(false);
    setIsWitnessOpen(false);
  }


  useEffect(() => {
    getCasedata();
    get_hearing(caseid);
    get_evidences(caseid);
    get_witnesses(caseid);
  }, []);

  return (
    <>
      {/* component */}

      <div className="flex justify-center py-6 min-h-screen h-full md:mx-4">
        <div className="relative p-3 w-screen mx-3 md:mx-0  dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
          {/* Case details section */}
          <div className="flex justify-end items-center space-x-2 rounded-b">
            <div className="flex justify-start mr-auto">
              <NavLink end to="/dashboard" className="block">
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-9 w-9 text-slate-800 dark:text-slate-100"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
                    <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
                  </g>
                </svg>
              </NavLink>
            </div>
            {(localStorage.getItem("userId") ===
              caseData.roleId ||
              localStorage.getItem("userId") ==
              caseData.transferToId) && (
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="bg-transparent text-black font-bold py-2 px-5 border border-transparent hover:border-[#10375e] rounded focus:outline-none focus:ring-0"
                >+
                </button>
              )}

          </div>
          <div className="flex justify-end relative">
            {showOptions && (
              <div className="absolute right-0 bg-white shadow-md rounded-md p-2">
                <ul>
                  <li className="cursor-pointer" onClick={handleShowHearing}>Add Hearing</li>
                  <li className="cursor-pointer" onClick={handleShowEvidence}>Add Evidence</li>
                  <li className="cursor-pointer" onClick={handleShowWitness}>Add Witness</li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-5 md:space-y-0 ">
            <div className="flex justify-center items-center md:items-start text-slate-800 dark:text-slate-100">
              {/* <div className="w-40 h-40 md:h-40 md:w-40 lg:w-60 lg:h-60 bg-white">
                <img
                  src="\src\images\user-36-02.jpg"
                  alt="tailwind logo"
                  className="rounded-xl w-full h-full"
                />
              </div> */}
            </div>
            <div className="w-full md:w-full text-slate-800 dark:text-slate-100 dark:bg-slate-800 flex flex-col space-y-2 p-3">
              {/* case header section */}
              <div className="md:flex justify-between item-center">
                <div className="flex items-center mb-1 ">
                  <p className="text-md font-bold lg:text-xl capitalize">
                    Case number:-&nbsp;
                    <span className="text-md font-semibold lg:text-xl">
                      {caseData ? caseData.cnrNumber : null}
                    </span>
                  </p>
                  <div className="md:hidden ml-auto bg-green-200 w-fit px-3 py-1 rounded-full text-normal font-medium text-black flex items-center">
                    {caseData ? caseData.caseStatus : null}
                  </div>
                </div>
                <div className="flex items-center mb-1 lg:mx-4">
                  <p className="text-md font-bold lg:text-xl capitalize">
                    Date file:-&nbsp;
                    <span className="text-md font-semibold lg:text-xl">
                      {caseData ? caseData.dateFiled : null}
                    </span>
                  </p>
                </div>
                <div className="flex items-center mb-1 ">
                  <p className="text-md font-bold lg:text-xl capitalize">
                    Case type:-&nbsp;
                    <span className="text-md font-semibold lg:text-xl capitalize">
                      {caseData
                        ? caseData.caseType
                          ? caseData.caseType.name
                          : null
                        : null}
                    </span>
                  </p>
                </div>
                <div className="hidden md:block bg-green-200 w-fit px-3 py-1 rounded-full text-normal font-medium text-black flex items-center">
                  {caseData ? caseData.caseStatus : null}
                </div>
              </div>
              {/* Candidate details section */}
              <div className="pt-5">
                <div className="md:flex">
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Deffendant:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData ? caseData.defendant : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Petitioner:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData ? caseData.petitioner : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Judge:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData ? caseData.judgeName : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Attorney:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData
                            ? caseData.attorney
                              ? caseData.attorney.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Advocate:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData
                            ? caseData.advocate
                              ? caseData.advocate.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Court:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData
                            ? caseData.court
                              ? caseData.court.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Act:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData
                            ? caseData.act
                              ? caseData.act.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Comments:-&nbsp;
                        <span className="lg:text-xl text-md font-semibold ml-1">
                          {caseData ? caseData.comments : null}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <p className="font-black font-bold text-md lg:text-xl capitalize">
                      Description:-&nbsp;
                      <span className="lg:text-xl text-md font-semibold ml-1">
                        {caseData ? caseData.description : null}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table section */}
          <div className="xl:flex w-full gap-x-2">
            {/* Hearing table section */}
            <div className="w-full">
              <CasesTable
                HearingDetail={hearing}
                tableName={"Hearing"}
                CaseId={caseid}
              />
            </div>
            {/* Evidence table section */}
            <div className="w-full">
              <CasesTable
                Evidence={evidences}
                tableName={"Evidence"}
                CaseId={caseid}
              />
            </div>
            {/* Witness table section */}
            <div className="w-full">
              <CasesTable
                Witness={witnesses}
                tableName={"Witness"}
                CaseId={caseid}
              />
            </div>
          </div>
        </div>
      </div>
      <InsertHearing
        isOpen={isHearingOpen}
        onClose={closeform}
        caseId={caseid}
      />
      <InsertEvidence
        isOpen={isEvidenceOpen}
        onClose={closeform}
        caseId={caseid} />

      <InsertWitness
        isOpen={isWitnessOpen}
        onClose={closeform}
        caseId={caseid}
      />
    </>
  );
};

export default ShowCaseDetail;
