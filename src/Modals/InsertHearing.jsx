import { React, useState, useEffect } from 'react'
import { addHearing, updateHearing } from '../Services/Api';


function InsertHearing({ isOpen, onClose, editeHearing, caseId }) {

    const [form, setForm] = useState({
        caseId: caseId,
        hearingDate: "",
        hearingDetails: "",

    });
    const [updateform, setUpdateForm] = useState({
        id: editeHearing ? (editeHearing.id ? editeHearing.id : "") : "",
        caseId: editeHearing ? (editeHearing.caseId ? editeHearing.caseId : "") : "",
        hearingDate: editeHearing ? (editeHearing.hearingDate ? editeHearing.hearingDate : "") : "",
        hearingDetails: editeHearing ? (editeHearing.hearingDetails ? editeHearing.HearingDetails : "") : "",
    });

    useEffect(() => {

        console.log("editeHearing", editeHearing);
        if (editeHearing) {
            setUpdateForm({
                id: editeHearing.id || "",
                caseId: editeHearing.caseId || "",
                hearingDate: editeHearing.hearingDate || "",
                hearingDetails: editeHearing.hearingDetails || "",
            });
            console.log(updateform);
        } else {
            setForm({

                caseId: caseId,
                hearingDate: "",
                hearingDetails: "",
            });

            // Clear the updateform when there's no editAdvocateData
            setUpdateForm({
                caseId: "",
                hearingDate: "",
                hearingDetails: "",
            });
        }
    }, [editeHearing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (editeHearing) {
            setUpdateForm({
                ...updateform,
                [name]: value,
            });
        }
        setForm({
            ...form,
            [name]: value,
        });
        console.log(form);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.textContent);
        if (e.target.textContent == "Add") {
            console.log(form);
            const res = await addHearing(form);
            console.log("Add response: " + res)

        }
        else if (e.target.textContent == "Update") {
            console.log(updateform);
            const res = await updateHearing(updateform)
            console.log("update response: " + res)

        }
        onClose();
    };
    if (editeHearing) {
        return (
            <>
                <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                        <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                            <div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <input
                                        value={caseId}
                                        onChange={handleInputChange}
                                        type="hidden"
                                        name='caseId'
                                        id='CaseId'
                                        placeholder="CaseId"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
                                </div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="hearingDate" className="block font-semibold mb-2">Hearing Date</label>
                                    <input
                                        defaultValue={updateform.hearingDate}
                                        onChange={handleInputChange}
                                        type="date"
                                        name='hearingDate'
                                        id='hearingDate'
                                        placeholder="Hearing Date"
                                        className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
                                </div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="HearingDetails" className="block font-semibold mb-2">Hearing Details</label>
                                    <textarea
                                        defaultValue={updateform.hearingDetails}
                                        onChange={handleInputChange}
                                        id='hearingDetails'
                                        name='hearingDetails'
                                        placeholder="HearingDetails"
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
        )
    }
    return (
        <>
            <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                    <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                        <div>

                            <div className="items-center justify-between rounded-t dark:border-gray-600">
                                <input
                                    value={caseId}
                                    onChange={handleInputChange}
                                    type="hidden"
                                    name='CaseId'
                                    id='CaseId'
                                    placeholder="CaseId"
                                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="HearingDate" className="block font-semibold mb-2">Hearing Date</label>
                                <input
                                    defaultValue={form.HearingDate}
                                    onChange={handleInputChange}
                                    type="date"
                                    name='HearingDate'
                                    id='HearingDate'
                                    placeholder="Hearing Date"
                                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="HearingDetails" className="block font-semibold mb-2">Hearing Details</label>
                                <textarea
                                    defaultValue={form.HearingDetails}
                                    onChange={handleInputChange}
                                    id='HearingDetails'
                                    name='HearingDetails'
                                    placeholder="HearingDetails"
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
    )
}

export default InsertHearing