import { React, useState,useEffect } from 'react'
import {addAdvocate,editAdvocateAPI} from "../Services/Api";

function InsertAdvocate({ isOpen, onClose,editAdvocateData }) {
    const [form, setForm] = useState({
        name: "",
        Enrollmentnumber: "",
    });

    const [updateform, setUpdateForm] = useState({
        id: editAdvocateData ? (editAdvocateData.id ? editAdvocateData.id : "") : "",
        name: editAdvocateData ? (editAdvocateData.name ? editAdvocateData.name : "") : "",
        Enrollmentnumber: editAdvocateData ? (editAdvocateData.enrollmentNumber ? editAdvocateData.enrollmentNumber : "") : "",
      });
    
    useEffect(() => {
        if (editAdvocateData) {
            console.log("editAdvocateData", editAdvocateData);
          setUpdateForm({
            id: editAdvocateData.id || "",
            name: editAdvocateData.name || "",
            Enrollmentnumber: editAdvocateData.enrollmentNumber || "",
          });
        //   console.log(updateform);
        } else {
            setForm({
               
                name: "",
                Enrollmentnumber: "",
              });

          // Clear the updateform when there's no editAdvocateData
          setUpdateForm({
            id: "",
            name: "",
            Enrollmentnumber: "",
          });
        }
      }, [editAdvocateData]);    

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        if(editAdvocateData){
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
    const handleSubmit= async (e) => {
        e.preventDefault();
        console.log(e.target.textContent);
        if (e.target.textContent=="Add"){
            
            const res = await addAdvocate(form);
            console.log("Add response: " + res)
            setForm({
                id: "",
                name: "",
                Enrollmentnumber: "",
              });

        }
        else if(e.target.textContent=="Update"){
            console.log(updateform);
            const res= await editAdvocateAPI(updateform)
            console.log("update response: " + res)

        }
        onClose();
    };
    if(editAdvocateData){

        return (
            <>
                <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                        <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                            <div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="state" className="block font-semibold mb-2">Advocate Name:</label>
                                    <input
                                        defaultValue={updateform.name}
                                        onChange={handleInputChange}
                                        name='name'
                                        type="text"
                                        placeholder="Advocate name"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
                                </div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="district" className="block font-semibold mb-2">Enrollment Number:</label>
                                    <input
                                        defaultValue={updateform.Enrollmentnumber}
                                        onChange={handleInputChange}
                                        type="number"
                                        name='Enrollmentnumber'
                                        placeholder="Enrollment number"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
    
                                </div>
                                <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                                    <button
                                        onClick={handleSubmit}
                                        className="bg-[#10375e] hover:bg-[#185490] text-white font-semibold hover:text-white py-2 px-4 border  rounded focus:outline-none focus:ring-0"
                                    >
                                        Update
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
                <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                        <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                            <div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="state" className="block font-semibold mb-2">Advocate Name:</label>
                                    <input
                                        defaultValue={form.Advocatename}
                                        onChange={handleInputChange}
                                        name='name'
                                        type="text"
                                        placeholder="Advocate name"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
                                </div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="district" className="block font-semibold mb-2">Enrollment Number:</label>
                                    <input
                                        defaultValue={form.Enrollmentnumber}
                                        onChange={handleInputChange}
                                        type="number"
                                        name='Enrollmentnumber'
                                        placeholder="Enrollment number"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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

export default InsertAdvocate