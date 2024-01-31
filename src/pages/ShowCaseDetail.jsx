  import { React, useState, useEffect } from "react";
import CasesTable from "../common/CasesTable";
import { useParams } from "react-router-dom";
import { getCaseDetails } from "../Services/Api";
import { NavLink } from "react-router-dom";
import InsertHearing from "../Modals/InsertHearing";
import InsertEvidence from "../Modals/InsertEvidence";
import InsertWitness from "../Modals/InsertWitness";
import { tokenData } from "../Services/Config";
import {
  getHearing,
  getEvidences,
  getallEvidences,
  getWitnesses,
} from "../Services/Api";

const ShowCaseDetail = () => {
  const { caseid } = useParams();
  const [caseData, setCaseData] = useState([]);
  const [hearing, setHearing] = useState([]);
  const [evidences, setEvidences] = useState([]);
  const [witnesses, setWitnesses] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isHearingOpen, setIsHearingOpen] = useState(false);
  const [isEvidenceOpen, setIsEvidenceOpen] = useState(false);
  const [isWitnessOpen, setIsWitnessOpen] = useState(false);

  const get_hearing = async (caseId) => {
    const res = await getHearing(caseId);
    setHearing(res);
    // console.log(hearing);
  };

  const get_evidences = async (caseId) => {
    const res = await getEvidences(caseId);
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

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };
  const handleOutsideClick = () => {
    if (showOptions) {
      setShowOptions(false);
    }
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
  };

  const getAllDataFroHearingEvidenceAndWitness = () => {
    get_hearing(caseid);
    get_evidences(caseid);
    get_witnesses(caseid);
  };

  useEffect(() => {
    getCasedata();
    getAllDataFroHearingEvidenceAndWitness();
  }, []);
  useEffect(() => {
    getAllDataFroHearingEvidenceAndWitness();
  }, [isEvidenceOpen, isWitnessOpen, isHearingOpen]);

  // return (
  //   <>
  //     {/* component */}

  //     <div
  //       className="flex justify-center py-6 min-h-screen h-full md:mx-4"
  //       onClick={handleOutsideClick}
  //     >
  //       <div className="relative p-3 w-screen mx-3 md:mx-0  dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
  //         {/* Case details section */}
  //         <div className="flex justify-end items-center space-x-2 rounded-b">
  //           <div className="flex justify-start mr-auto">
  //             <NavLink end to="/dashboard" className="block">
  //               <svg
  //                 viewBox="0 0 1024 1024"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="currentColor"
  //                 className="h-9 w-9 text-slate-800 dark:text-slate-100"
  //               >
  //                 <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  //                 <g
  //                   id="SVGRepo_tracerCarrier"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                 />
  //                 <g id="SVGRepo_iconCarrier">
  //                   <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
  //                   <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
  //                 </g>
  //               </svg>
  //             </NavLink>
  //           </div>
  //           <div
  //             style={{ marginRight: "1rem" }}
  //             className="bg-green-200 w-fit px-3 py-1 rounded-full text-normal font-medium text-black flex items-center"
  //           >
  //             {caseData ? caseData.caseStatus : null}
  //           </div>

  //           {(tokenData.courtId == caseData.transferToId) && (
  //               <div className="options-menu">
  //                 <button
  //                   type="button"
  //                   onClick={handleButtonClick}
  //                   className="flex items-center justify-center p-2 border border-gray-400 rounded"
  //                 >
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-6 w-6"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke="currentColor"
  //                   >
  //                     <path
  //                       strokeLinecap="round"
  //                       strokeLinejoin="round"
  //                       strokeWidth={2}
  //                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
  //                     />
  //                   </svg>
  //                 </button>
  //               </div>
  //             )}
  //         </div>
  //         <div className="flex justify-end relative">
  //           {showOptions && (
  //             <div className="absolute right-0 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg rounded-md mt-2 p-4">
  //               <ul>
  //                 <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
  //                   <button
  //                     className="cursor-pointer"
  //                     onClick={handleShowHearing}
  //                   >
  //                     Add Hearing
  //                   </button>
  //                 </li>
  //                 <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
  //                   <button
  //                     className="cursor-pointer"
  //                     onClick={handleShowEvidence}
  //                   >
  //                     Add Evidence
  //                   </button>
  //                 </li>
  //                 <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
  //                   <button
  //                     className="cursor-pointer"
  //                     onClick={handleShowWitness}
  //                   >
  //                     Add Witness
  //                   </button>
  //                 </li>
  //               </ul>
  //             </div>
  //           )}
  //         </div>
  //         <div className="flex flex-col md:flex-row md:space-x-5 md:space-y-0 ">
  //           {/* <div className="flex justify-center items-center md:items-start text-slate-800 dark:text-slate-100">
  //             <div className="w-40 h-40 md:h-40 md:w-40 lg:w-60 lg:h-60 bg-white">
  //               <img
  //                 src="\src\images\user-36-02.jpg"
  //                 alt="tailwind logo"
  //                 className="rounded-xl w-full h-full"
  //               />
  //             </div>
  //           </div> */}
  //           <div className="w-full md:w-full text-slate-800 dark:text-slate-100 dark:bg-slate-800 flex flex-col lg:space-y-2 p-2">
  //             <div className="pt-5">
  //               <div className="md:flex">
  //                 <div className="w-full">
  //                   <div className="mb-5">
  //                     <p className="text-md font-bold lg:text-xl capitalize">
  //                       Case number:-&nbsp;
  //                       <span className="text-md font-normal lg:text-xl">
  //                         {caseData ? caseData.cnrNumber : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Court:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData
  //                           ? caseData.court
  //                             ? caseData.court.name
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Advocate:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData
  //                           ? caseData.advocate
  //                             ? caseData.advocate.name
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Deffendant:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData ? caseData.defendant : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="w-full">
  //                   <div className="mb-5">
  //                     <p className="text-md font-bold lg:text-xl capitalize">
  //                       Date file:-&nbsp;
  //                       <span className="text-md font-normal lg:text-xl">
  //                         {caseData ? caseData.dateFiled : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Act:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData
  //                           ? caseData.act
  //                             ? caseData.act.name
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Attorney:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData
  //                           ? caseData.attorney
  //                             ? caseData.attorney.name
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Judgment:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData
  //                           ? caseData.judgment
  //                             ? caseData.judgment
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <div className="w-full">
  //                   <div className="mb-5">
  //                     <p className="text-md font-bold lg:text-xl capitalize">
  //                       Case type:-&nbsp;
  //                       <span className="text-md font-normal lg:text-xl capitalize">
  //                         {caseData
  //                           ? caseData.caseType
  //                             ? caseData.caseType.name
  //                             : null
  //                           : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Judge:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData ? caseData.judgeName : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                   <div className="mb-5">
  //                     <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                       Petitioner:-&nbsp;
  //                       <span className="lg:text-xl text-md font-normal ml-1">
  //                         {caseData ? caseData.petitioner : null}
  //                       </span>
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="mb-5">
  //                 <div>
  //                   <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                     Comments:-&nbsp;
  //                     <span className="lg:text-xl text-md font-normal ml-1">
  //                       {caseData ? caseData.comments : null}
  //                     </span>
  //                   </p>
  //                 </div>
  //               </div>
  //               <div>
  //                 <div className="mb-2">
  //                   <p className="font-black font-bold text-md lg:text-xl capitalize">
  //                     Description:-&nbsp;
  //                     <span className="lg:text-xl text-md font-normal ml-1">
  //                       {caseData ? caseData.description : null}
  //                     </span>
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Table section */}
  //         <div className="xl:flex w-full gap-x-2">
  //           {/* Hearing table section */}
  //           <div className="w-full my-2">
  //             <CasesTable
  //               HearingDetail={hearing}
  //               tableName={"Hearing"}
  //               CaseId={caseid}
  //             />
  //           </div>
  //           {/* Evidence table section */}
  //           <div className="w-full my-2">
  //             <CasesTable
  //               Evidence={evidences}
  //               tableName={"Evidence"}
  //               CaseId={caseid}
  //             />
  //           </div>
  //           {/* Witness table section */}
  //           <div className="w-full my-2">
  //             <CasesTable
  //               Witness={witnesses}
  //               tableName={"Witness"}
  //               CaseId={caseid}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <InsertHearing
  //       isOpen={isHearingOpen}
  //       onClose={closeform}
  //       caseId={caseid}
  //     />
  //     <InsertEvidence
  //       isOpen={isEvidenceOpen}
  //       onClose={closeform}
  //       caseId={caseid}
  //     />

  //     <InsertWitness
  //       isOpen={isWitnessOpen}
  //       onClose={closeform}
  //       caseId={caseid}
  //     />
  //   </>
  // );
console.log(caseData);
  return (
    <>
      {/* component */}
      <div
        className="flex justify-center py-6 min-h-screen h-full md:mx-4"
        onClick={handleOutsideClick}
      >
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
            <div
              style={{ marginRight: "1rem" }}
              className="bg-green-200 w-fit px-3 py-1 rounded-full text-normal font-medium text-black flex items-center"
            >
              {caseData ? caseData.caseStatus : null}
            </div>

            {tokenData.courtId == caseData.transferToId && (
              <div className="options-menu">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="flex items-center justify-center p-2 border border-gray-400 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end relative">
            {showOptions && (
              <div className="absolute right-0 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-lg rounded-md mt-2 p-4">
                <ul>
                  <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
                    <button
                      className="cursor-pointer"
                      onClick={handleShowHearing}
                    >
                      Add Hearing
                    </button>
                  </li>
                  <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
                    <button
                      className="cursor-pointer"
                      onClick={handleShowEvidence}
                    >
                      Add Evidence
                    </button>
                  </li>
                  <li className="my-2 block py-1 font-semibold text-gray-500 dark:text-slate-100 hover:text-black md:mx-2">
                    <button
                      className="cursor-pointer"
                      onClick={handleShowWitness}
                    >
                      Add Witness
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-5 md:space-y-0 ">
            {/* <div className="flex justify-center items-center md:items-start text-slate-800 dark:text-slate-100">
              <div className="w-40 h-40 md:h-40 md:w-40 lg:w-60 lg:h-60 bg-white">
                <img
                  src="\src\images\user-36-02.jpg"
                  alt="tailwind logo"
                  className="rounded-xl w-full h-full"
                />
              </div>
            </div> */}
            <div className="w-full md:w-full text-slate-800 dark:text-slate-100 dark:bg-slate-800 flex flex-col lg:space-y-2 p-2">
              <div className="pt-5">
                <div className="md:flex">
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="text-md font-bold lg:text-xl capitalize">
                        Case number:-&nbsp;
                        <span className="text-md font-normal lg:text-xl">
                          {caseData ? caseData.cnrNumber : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Court:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData
                            ? caseData.court
                              ? caseData.court.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Advocate:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
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
                        Deffendant:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData ? caseData.defendant : null}
                        </span>
                      </p>
                    </div>
                    
                    {tokenData.courtId != caseData.transferToId ? (
                      <div className="mb-5">
                        <p className="font-black font-bold text-md lg:text-xl capitalize">
                          Transfer To:-&nbsp;
                          <span className="lg:text-xl text-md font-normal ml-1">
                            {caseData
                              ? caseData.transferTo
                                ? caseData.transferTo.name
                                : null
                              : null}
                          </span>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Petitioner Email:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData ? caseData.PetitionerEmail : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="text-md font-bold lg:text-xl capitalize">
                        Date file:-&nbsp;
                        <span className="text-md font-normal lg:text-xl">
                          {caseData ? caseData.dateFiled : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Act:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
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
                        Attorney:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
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
                        Judgment:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData
                            ? caseData.judgment
                              ? caseData.judgment
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="text-md font-bold lg:text-xl capitalize">
                        Case type:-&nbsp;
                        <span className="text-md font-normal lg:text-xl capitalize">
                          {caseData
                            ? caseData.caseType
                              ? caseData.caseType.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Judge:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData ? caseData.judgeName : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Petitioner:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData ? caseData.petitioner : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black font-bold text-md lg:text-xl capitalize">
                        Petitioner Number:-&nbsp;
                        <span className="lg:text-xl text-md font-normal ml-1">
                          {caseData ? caseData.PetitionerNumber : null}
                        </span>
                      </p>
                    </div>
                    {tokenData.courtId != caseData.transferToId ? (
                      <div className="mb-5">
                        <p className="font-black font-bold text-md lg:text-xl capitalize">
                          Transfer From:-&nbsp;
                          <span className="lg:text-xl text-md font-normal ml-1">
                            {caseData
                              ? caseData.transferFrom
                                ? caseData.transferFrom.name
                                : null
                              : null}
                          </span>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="mb-5">
                  <div>
                    <p className="font-black font-bold text-md lg:text-xl capitalize">
                      Comments:-&nbsp;
                      <span className="lg:text-xl text-md font-normal ml-1">
                        {caseData ? caseData.comments : null}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <p className="font-black font-bold text-md lg:text-xl capitalize">
                      Description:-&nbsp;
                      <span className="lg:text-xl text-md font-normal ml-1">
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
            <div className="w-full my-2">
              <CasesTable
                HearingDetail={hearing}
                tableName={"Hearing"}
                CaseId={caseid}
              />
            </div>
            {/* Evidence table section */}
            <div className="w-full my-2">
              <CasesTable
                Evidence={evidences}
                tableName={"Evidence"}
                CaseId={caseid}
              />
            </div>
            {/* Witness table section */}
            <div className="w-full my-2">
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
        caseId={caseid}
      />

      <InsertWitness
        isOpen={isWitnessOpen}
        onClose={closeform}
        caseId={caseid}
      />
    </>
  );
};

export default ShowCaseDetail;
