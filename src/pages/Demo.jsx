import { React, useState } from "react";
import CasesTable from "../common/CasesTable";
import { HearingDetail, Evidence } from "../constant";

const Demo = () => {

  return (
    <>
      {/* component */}
      <div className="flex justify-center py-6 min-h-screen h-full md:mx-4">
        <div className="relative rounded-xl shadow-lg p-3 w-screen mx-3 md:mx-0 border border-black bg-white ">
          {/* Case details section */}
          <div className="flex flex-col md:flex-row md:space-x-5 md:space-y-0 ">
            <div className="flex justify-center items-center md:items-start">
              <div className="w-40 h-40 md:h-40 md:w-40 lg:w-60 lg:h-60 bg-white">
                <img
                  src="\src\images\user-36-02.jpg"
                  alt="tailwind logo"
                  className="rounded-xl w-full h-full"
                />
              </div>
            </div>
            <div className="w-full md:w-full bg-white flex flex-col space-y-2 p-3">
              {/* case header section */}
              <div className="md:flex justify-between item-center">
                <div className="flex items-center mb-1">
                  <p className="text-gray-500 text-xs font-medium">
                    Case number:
                    <span className="text-gray-600 font-bold text-sm">
                      125202
                    </span>
                  </p>
                </div>
                <div className="flex items-center mb-1">
                  <p className="text-gray-500 text-xs font-medium">
                    Date file:
                    <span className="text-gray-600 font-bold text-sm">
                      23 Oct 2023
                    </span>
                  </p>
                </div>
                <div className="flex items-center mb-1">
                  <p className="text-gray-500 text-xs font-medium">
                    Case type:
                    <span className="text-gray-600 font-bold text-sm">
                      Criminal
                    </span>
                  </p>
                </div>
                <div className="bg-green-200 w-fit px-3 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center">
                  Pending
                </div>
              </div>
              {/* Candidate details section */}
              <div className="pt-5">
                <div className="md:flex">
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black text-gray-800 text-md lg:text-2xl capitalize">
                        Deffendant:
                        <span className="text-gray-500 md:text-lg font-medium ml-1">
                          Sandeep Bhai
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black text-gray-800 text-md lg:text-2xl capitalize">
                        Petitioner:
                        <span className="text-gray-500 lg:text-lg font-medium ml-1">
                          Mahesh Bhai
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black text-gray-800 lg:text-2xl capitalize">
                        Judge:
                        <span className="text-gray-500 lg:text-lg font-medium ml-1">
                          Nilesh Bhai
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-5">
                      <p className="font-black text-gray-800 text-md lg:text-2xl capitalize">
                        Attorney Advocate:
                        <span className="text-gray-500 lg:text-lg font-medium ml-1">
                          Suresh Bhai
                        </span>
                      </p>
                    </div>
                    <div className="mb-5">
                      <p className="font-black text-gray-800 text-md lg:text-2xl capitalize">
                        Advocate:
                        <span className="text-gray-500 lg:text-lg font-medium ml-1">
                          Ramesh Bhai
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <p className="font-black text-gray-800 lg:text-2xl capitalize">
                      Description:
                      <span className="text-gray-500 lg:text-lg font-medium ml-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
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
              {/* <CasesTable HearingDetail={HearingDetail} tableName={"Hearing"} /> */}
            </div>
            {/* Evidence table section */}
            <div className="w-full mt-2 xl:mt-0">
              {/* <CasesTable Evidence={Evidence} tableName={"Evidence"} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
