import { React, useState, useEffect, useRef } from "react";
import {
  addEvidence,
  addHearing,
  addWitness,
  updateEvidence,
  updateHearing,
} from "../Services/Api";
import axios from "axios";
import { prefixUrl } from "../Services/Config";
import Cookies from "js-cookie";
import {tokenData} from '../Services/Config'
function InsertWitness({ isOpen, onClose, editeEvidence, caseId }) {

  const formData = new FormData();

  const witnessName = useRef(null);
  const witnessImage = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("caseId", caseId)
    formData.append("witnessName", witnessName.current.value);
    formData.append("file", witnessImage.current.files[0]);
    formData.append("roleId",tockenData.role);

    console.log(formData);
    if (e.target.textContent == "Add") {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        console.error("Token not found.");
        return null;
      }

      const response = await axios.post(
        `${prefixUrl}/Witness/${caseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then(()=>{
        witnessName.current.value = "";
        witnessImage.current.value = "";
      });
    } else if (e.target.textContent == "Update") {
      const res = await updateEvidence(updateform);
    }
    onClose();
  };
  if (editeEvidence) {
    return (
      <>
        <div
          className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? "block" : "hidden"
            }`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
              <div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Witness Name:
                  </label>
                  <input
                    defaultValue={updateform.WitnessName}
                    ref={witnessName}
                    type="text"
                    name="WitnessName"
                    placeholder="Witness name"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label
                    htmlFor="witnessImage"
                    className="block font-semibold mb-2"
                  >
                    Upload Witness Image:
                  </label>
                  <input
                    type="file"
                    defaultValue={updateform.Image}
                    name="WitnessImage"
                    accept="image/*" // Allow only image files
                    ref={witnessImage}
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                  >
                    Add
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-white text-[#10375e] font-bold  py-2 px-5 border border-gray-300 rounded focus:outline-none focus:ring-0"
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
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? "block" : "hidden"
          }`}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Witness Name:
                </label>
                <input
                  ref={witnessName}
                  type="text"
                  name="WitnessName"
                  placeholder="Witness name"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label
                  htmlFor="witnessImage"
                  className="block font-semibold mb-2"
                >
                  Upload Witness Image:
                </label>
                <input
                  type="file"
                  name="WitnessImage"
                  accept="image/*" // Allow only image files
                  ref={witnessImage}
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                >
                  Add
                </button>
                <button
                  onClick={onClose}
                  className="bg-white text-[#10375e] font-bold  py-2 px-5 border border-gray-300 rounded focus:outline-none focus:ring-0"
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

export default InsertWitness;
