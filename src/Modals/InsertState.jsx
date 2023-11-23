import { React, useState, useEffect } from 'react'
import { addState, updateState } from "../Services/Api";

function InsertState({ isOpen, onClose, editSingleState , getAllStatesData }) {
    const [form, setForm] = useState({
        name: "",
    });
    const [updateform, setUpdateForm] = useState({
        id: editSingleState ? (editSingleState.id ? editSingleState.id : "") : "",
        name: editSingleState ? (editSingleState.name ? editSingleState.name : "") : "",
    });
    // console.log("editSingleState");
    // console.log(editSingleState);
    useEffect(() => {
        if (editSingleState) {
          setUpdateForm({
            id: editSingleState.id || "",
            name: editSingleState.name || "",
          });
        } else {
          setUpdateForm({
            id: "",
            name: "",
          });
        }
      }, [editSingleState]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const updatehandleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm({
          ...updateform,
          [name]: value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(e.target.textContent === "Add") {
            const res = await addState(form);
        }
        else if(e.target.textContent === "Edit")
        {
            console.log("form")   
            console.log(form)   
            const res = await updateState(updateform);
        }
        await getAllStatesData();
        onClose();
    };
    if(editSingleState)
    {
        return(
        <>
            <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                    <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
                        <div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="state" className="block font-semibold mb-2">State Name:</label>
                                <input
                                    defaultValue={updateform.name}
                                    onChange={updatehandleInputChange}
                                    type="text"
                                    name='name'
                                    placeholder="State Name"
                                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-0"
                                >
                                    Edit
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

        </>);
    }
    return (
        <>
            <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                    <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
                        <div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="state" className="block font-semibold mb-2">State Name:</label>
                                <input
                                    defaultValue={form.name}
                                    onChange={handleInputChange}
                                    type="text"
                                    name='name'
                                    placeholder="State Name"
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
    )
}

export default InsertState