import { React, useState, useEffect, useRef } from 'react'
import { addHearing, updateHearing } from '../Services/Api';
import {tokenData} from '../Services/Config'

function InsertHearing({ isOpen, onClose, editeHearing, caseId }) {
    const dateOfHearing = useRef(null);
    const descriptionOfHearing = useRef(null);

    const [form, setForm] = useState({
        roleId:tokenData.role,
        caseId: caseId,
        hearingDate: "",
        hearingDetails: "",

    });

    const [updateform, setUpdateForm] = useState({
        id: editeHearing ? (editeHearing.id ? editeHearing.id : "") : "",
        caseId: editeHearing ? (editeHearing.caseId ? editeHearing.caseId : "") : "",
        hearingDate: editeHearing ? (editeHearing.hearingDate ? editeHearing.hearingDate : "") : "",
        hearingDetails: editeHearing ? (editeHearing.hearingDetails ? editeHearing.HearingDetails : "") : "",
        roleId:tokenData.role,
    });


    useEffect(() => {
        const dtToday = new Date();
    
        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        const year = dtToday.getFullYear();
    
        if (month < 10) {
          month = '0' + month.toString();
        }
        if (day < 10) {
          day = '0' + day.toString();
        }
    
        const maxDate = year + '-' + month + '-' + day;
    
        // or instead:
        // const maxDate = dtToday.toISOString().substr(0, 10);
    
        document.getElementById('txtDate').min = maxDate;
      }, []); 

    useEffect(() => {

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
                roleId:tokenData.role,
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.textContent == "Add") {
            console.log(form);
            const dataToAdd = { ...form, ...caseId };
            const res = await addHearing(dataToAdd);
            // console.log("data :",dataToAdd);
            
            if(res.status == 200){
                
                const dataForSingleCase = await getCaseDetails(parseInt(caseid));

                console.log(dataForSingleCase)

                // let advocateEmail = dataForSingleCase.Advocate.Email;

                const dataForMail = {
                    dateOfHearing: dataofHearing.current.value,
                    subject : `Hearing Date`, 
                    body: `Your Case No.${dataForSingleCase.cnrNumber} next hearing Date: ${dataofHearing.current.value}`,
                    to : [dataForSingleCase.Advocate.Email,dataForSingleCase.PetitionerEmail,dataForSingleCase.DefendantEmail,dataForSingleCase.Attorney.Email]
                }
                
                const responseForMail = await sendMailForHearing(dataForMail);

                const dataForSms = {
                    HearingDate:dataofHearing.current.value,
                    Message:`Your Case No.${dataForSingleCase.cnrNumber} next hearing Date: ${dataofHearing.current.value}`,
                    to : [dataForSingleCase.Advocate.Number,dataForSingleCase.PetitionerNumber,dataForSingleCase.DefendantNumber,dataForSingleCase.Attorney.Number]
                };
                
                const responseForSms = await sendSmsForHearing(dataForSms);

            }
            dateOfHearing.current.value = "";
            descriptionOfHearing.current.value = "";
            

        }
        else if (e.target.textContent == "Update") {
            console.log(updateform);
            const res = await updateHearing(updateform)
        }
        onClose();
    };
    
    const modelClose = async () => {
        if (!editeHearing) {
            dateOfHearing.current.value = "";
            descriptionOfHearing.current.value = "";
        }
        onClose();
    };

    if (editeHearing) {
        return (
            <>
                <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                        <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
                            <div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <input
                                        value={caseId}
                                        onChange={handleInputChange}
                                        type="hidden"
                                        name='caseId'
                                        id='caseId'
                                        placeholder="CaseId"
                                        className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                    />
                                </div>
                                <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                    <label htmlFor="hearingDate" className="block font-semibold mb-2">Hearing Date</label>
                                    <input
                                        defaultValue={updateform.hearingDate}
                                        onChange={handleInputChange}
                                        type="date"
                                        name='hearingDate'
                                        id='txtDate'
                                        placeholder="Hearing Date"
                                        className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
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
        )
    }
    return (
        <>
            <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                    <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
                        <div>

                            <div className="items-center justify-between rounded-t dark:border-gray-600">
                                <input
                                    value={caseId}
                                    onChange={handleInputChange}
                                    type="hidden"
                                    name='CaseId'
                                    id='CaseId'
                                    placeholder="CaseId"
                                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="HearingDate" className="block font-semibold mb-2">Hearing Date</label>
                                <input
                                    ref={dateOfHearing}
                                    onChange={handleInputChange}
                                    type="date"
                                    name='hearingDate'
                                    id='txtDate'
                                    placeholder="Hearing Date"
                                    className="pl-2 inputbox outline-none bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="HearingDetails" className="block font-semibold mb-2">Hearing Details</label>
                                <textarea
                                    ref={descriptionOfHearing}
                                    onChange={handleInputChange}
                                    id='hearingDetails'
                                    name='hearingDetails'
                                    placeholder="HearingDetails"
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
    )
}

export default InsertHearing