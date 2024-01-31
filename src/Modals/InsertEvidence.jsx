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
import { tokenData } from "../Services/Config";
function InsertEvidence({ isOpen, onClose, editeEvidence, caseId }) {
  const formData = new FormData();

  const evidenceDescription = useRef(null);
  const evidenceImage = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("caseId", caseId);
    formData.append("EvidenceDescription", evidenceDescription.current.value);
    formData.append("file", evidenceImage.current.files[0]);
    formData.append("roleId", tokenData.role);

    console.log(formData);
    if (e.target.textContent == "Add") {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        console.error("Token not found.");
        return null;
      }

      const response = await axios
        .post(`${prefixUrl}/Evidences`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          evidenceDescription.current.value = "";
          evidenceImage.current.value = "";
        });
    } else if (e.target.textContent == "Update") {
      const res = await updateEvidence(updateform);
      console.log("update response: " + res);
    }
    onClose();
  };
  if (editeEvidence) {
    return (
      <>
        <div
          className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
              <div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label htmlFor="state" className="block font-semibold mb-2">
                    Evidence Name:
                  </label>
                  <input
                    ref={evidenceDescription}
                    defaultValue={updateform.EvidenceDescription}
                    type="text"
                    name="EvidenceDescription"
                    placeholder="Witness name"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label
                    htmlFor="witnessImage"
                    className="block font-semibold mb-2"
                  >
                    Upload Evidence Image:
                  </label>
                  <input
                    ref={evidenceImage}
                    type="file"
                    defaultValue={updateform.Image}
                    name="WitnessImage"
                    accept="image/*" // Allow only image files
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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
  return (
    <>
      <div
        className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
          <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
            <div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="state" className="block font-semibold mb-2">
                  Evidence Description:
                </label>
                <input
                  ref={evidenceDescription}
                  type="text"
                  name="EvidenceDescription"
                  placeholder="Evidence Description"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label
                  htmlFor="witnessImage"
                  className="block font-semibold mb-2"
                >
                  Upload Evidence Image:
                </label>
                <input
                  ref={evidenceImage}
                  type="file"
                  name="WitnessImage"
                  accept="image/*" // Allow only image files
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

export default InsertEvidence;
