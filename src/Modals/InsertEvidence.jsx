    import { React, useState } from 'react'
    const caseData = [343,345,355,347];

    function InsertEvidence({ isOpen, onClose }) {
        
        const [form, setForm] = useState({
            CaseId: "",
            EvidenceDescription: "",
            Image: "",
        
        });
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setForm({
                ...form,
                [name]: value,
            });
        };
        const handleFileChange = (e) => {
            const { name, files } = e.target;
            if (files[0]) {
                const file = files[0];
                const fileSize = file.size / 1024 / 1024; // size in MB
                if (fileSize > 2) {
                    alert("File size exceeds 2MB");
                    e.target.value = '';
                    return;
                }
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if (!validImageTypes.includes(file.type)) {
                    alert("Invalid file type and Only images");
                    e.target.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    setForm({
                        ...form,
                        [name]: reader.result,
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(form)
            onClose();
        };
        return (
            <>
            <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
                    <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                        <div>
                            
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="CaseId" className="block font-semibold mb-2">Select State:</label>
                                <select
                                    id="CaseId"
                                    name='CaseId'
                                    defaultValue={form.CaseId}
                                    onChange={handleInputChange}
                                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                >
                                    <option value="">Select a Case</option>
                                    {caseData.map((data,index) => (
                                        <option key={index} value={data}>
                                            {data}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="EvidenceDescription" className="block font-semibold mb-2">Evidence Description</label>
                                <textarea
                                    defaultValue={form.EvidenceDescription}
                                    onChange={handleInputChange}
                                    id='EvidenceDescription'
                                    name='EvidenceDescription'
                                    placeholder="EvidenceDescription"
                                    className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                                />

                            </div>
                            <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                                <label htmlFor="Image" className="block font-semibold mb-2">Image</label>
                                <input
                                    type='file'
                                    defaultValue={form.Image}
                                    onChange={handleFileChange}
                                    id='Image'
                                    name='Image'
                                    accept="image/*"
                                    placeholder="Image"
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

    export default InsertEvidence