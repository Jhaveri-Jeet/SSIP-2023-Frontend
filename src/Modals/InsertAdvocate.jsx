import { React, useState, useEffect, useRef } from "react";
import { addAdvocate, editAdvocateAPI } from "../Services/Api";

function InsertAdvocate({ isOpen, onClose, editAdvocateData }) {

  const advocateName = useRef(null);
  const enrollmentNumber = useRef(null);
  const number = useRef(null);
  const email = useRef(null);

  const [form, setForm] = useState({
    name: "",
    Enrollmentnumber: "",
    number: "",
    email: ""
  });

  const [updateform, setUpdateForm] = useState({
    id: editAdvocateData
      ? editAdvocateData.id
        ? editAdvocateData.id
        : ""
      : "",
    name: editAdvocateData
      ? editAdvocateData.name
        ? editAdvocateData.name
        : ""
      : "",
    Enrollmentnumber: editAdvocateData
      ? editAdvocateData.enrollmentNumber
        ? editAdvocateData.enrollmentNumber
        : ""
      : "",
    number: editAdvocateData
      ? editAdvocateData.number
        ? editAdvocateData.number
        : ""
      : "",
    email: editAdvocateData
      ? editAdvocateData.email
        ? editAdvocateData.email
        : ""
      : "",
  });

  useEffect(() => {
    if (editAdvocateData) {
      setUpdateForm({
        id: editAdvocateData.id || "",
        name: editAdvocateData.name || "",
        Enrollmentnumber: editAdvocateData.enrollmentNumber || "",
        number: editAdvocateData.number || "",
        email: editAdvocateData.email || "",
      });
      //   console.log(updateform);
    } else {
      setForm({
        name: "",
        Enrollmentnumber: "",
        number: "",
        email: ""
      });

      // Clear the updateform when there's no editAdvocateData
      setUpdateForm({
        id: "",
        name: "",
        Enrollmentnumber: "",
        number: "",
        email: "",
      });
    }
  }, [editAdvocateData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editAdvocateData) {
      setUpdateForm({
        ...updateform,
        [name]: value,
      });
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.textContent == "Add") {
      const res = await addAdvocate(form);
      advocateName.current.value = "";
      enrollmentNumber.current.value = "";
      setForm({
        name: "",
        Enrollmentnumber: "",
        number: "",
        email: ""
      });
    } else if (e.target.textContent == "Update") {
      console.log(updateform);
      const res = await editAdvocateAPI(updateform);
      console.log("update response: " + res);
      setForm({
        id: "",
        name: "",
        Enrollmentnumber: "",
        number: "",
        email: ""
      });
    }
    onClose();
  };

  const modelClose = async () => {
    if (!editAdvocateData) {
      advocateName.current.value = "";
      enrollmentNumber.current.value = "";
    }
    onClose();
  }
  if (editAdvocateData) {
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
                    Advocate Name:
                  </label>
                  <input
                    defaultValue={updateform.name}
                    onChange={handleInputChange}
                    name="name"
                    type="text"
                    placeholder="Advocate name"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                  <label
                    htmlFor="district"
                    className="block font-semibold mb-2"
                  >
                    Enrollment Number:
                  </label>
                  <input
                    defaultValue={updateform.Enrollmentnumber}
                    onChange={handleInputChange}
                    type="number"
                    name="Enrollmentnumber"
                    placeholder="Enrollment number"
                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                  />
                </div>
                <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                  >
                    Update
                  </button>
                  <button
                    onClick={modelClose}
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
                  Advocate Name:
                </label>
                <input
                  ref={advocateName}
                  onChange={handleInputChange}
                  name="name"
                  type="text"
                  placeholder="Advocate name"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Enrollment Number:
                </label>
                <input
                  ref={enrollmentNumber}
                  onChange={handleInputChange}
                  type="number"
                  name="Enrollmentnumber"
                  placeholder="Enrollment number"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Phone Number:
                </label>
                <input
                  ref={number}
                  onChange={handleInputChange}
                  type="number"
                  name="number"
                  placeholder="Phone Number"
                  className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                />
              </div>
              <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                <label htmlFor="district" className="block font-semibold mb-2">
                  Email Address:
                </label>
                <input
                  ref={email}
                  onChange={handleInputChange}
                  type="email"
                  name="email"
                  placeholder="Email Address"
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
                  onClick={modelClose}
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

export default InsertAdvocate;
