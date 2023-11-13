import { React, useState, useEffect } from "react";
import CasesTable from "../common/CasesTable";
import { HearingDetail, Evidence } from "../constant";
import { useParams } from "react-router-dom";
import { getCaseDetails } from "../Services/Api";
import { NavLink } from "react-router-dom";
// import {inse}
import InsertHearing from "../Modals/InsertHearing";

import { getHearing, getallHearing } from "../Services/Api"
const ShowCaseDetail = () => {
  const { caseid } = useParams();
  const [caseData, setCaseData] = useState([]);
  const [hearing, setHearing] = useState([])


  const get_hearing = async (caseId) => {
    const res = await getallHearing();
    console.log("res", res);
    setHearing(res);
    // console.log(hearing);
  };

  const getCasedata = async () => {
    const response = await getCaseDetails(parseInt(caseid));
    setCaseData(response);
  };
  useEffect(() => {
    getCasedata();
    get_hearing(caseid);

  }, []);

  return (
    <>
      {/* component */}

      <div className="flex justify-center py-6 min-h-screen h-full md:mx-4">
        <div className="relative rounded-xl shadow-lg p-3 w-screen mx-3 md:mx-0 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">
          {/* Case details section */}
          <div className="flex items-center mb-1 h-8 w-8 justify-start text-slate-800 dark:text-slate-100">
            <NavLink end to="/dashboard" className="block">
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-full w-full text-slate-800 dark:text-slate-100"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path

                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />
                  <path

                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  />
                </g>
              </svg>
            </NavLink>
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
            <div className="w-full md:w-full text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 flex flex-col space-y-2 p-3">
              {/* case header section */}
              <div className="md:flex justify-between item-center">
                <div className="flex items-center mb-1">
                  <p className=" text-xs font-medium">
                    Case number:
                    <span className=" font-bold text-sm">
                      {caseData ? caseData.cnrNumber : null}
                    </span>
                  </p>
                </div>
                <div className="flex items-center mb-1">
                  <p className=" text-xs font-medium">
                    Date file:
                    <span className=" font-bold text-sm">
                      {caseData ? caseData.dateFiled : null}
                    </span>
                  </p>
                </div>
                <div className="flex items-center mb-1">
                  <p className=" text-xs font-medium">
                    Case type:
                    <span className=" font-bold text-sm">
                      {caseData
                        ? caseData.caseType
                          ? caseData.caseType.description
                          : null
                        : null}
                    </span>
                  </p>
                </div>
                <div className="bg-green-200 w-fit px-3 py-1 rounded-full text-xs font-medium text-black flex items-center">
                  {caseData ? caseData.caseStatus : null}
                </div>
              </div>
              {/* Candidate details section */}
              <div className="pt-5">
                <div className="md:flex">
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black  text-md lg:text-2xl capitalize">
                        Deffendant:
                        <span className=" md:text-lg font-medium ml-1">
                          {caseData ? caseData.defendant : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black  text-md lg:text-2xl capitalize">
                        Petitioner:
                        <span className=" lg:text-lg font-medium ml-1">
                          {caseData ? caseData.petitioner : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black  lg:text-2xl capitalize">
                        Judge:
                        <span className=" lg:text-lg font-medium ml-1">
                          {caseData ? caseData.judgeName : null}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black  text-md lg:text-2xl capitalize">
                        Attorney Advocate:
                        <span className=" lg:text-lg font-medium ml-1">
                          {caseData
                            ? caseData.attorney
                              ? caseData.attorney.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black  text-md lg:text-2xl capitalize">
                        Advocate:
                        <span className=" lg:text-lg font-medium ml-1">
                          {caseData
                            ? caseData.advocate
                              ? caseData.advocate.name
                              : null
                            : null}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <p className="font-black  lg:text-2xl capitalize">
                      Description:
                      <span className=" lg:text-lg font-medium ml-1">
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
              <CasesTable HearingDetail={hearing} tableName={"Hearing"} CaseId={caseid} />
            </div>
            {/* Evidence table section */}
            {/* <div className="w-full mt-2 xl:mt-0">
              <CasesTable Evidence={Evidence} tableName={"Evidence"} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCaseDetail;
