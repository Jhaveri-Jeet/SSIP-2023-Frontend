import { React, useState, useEffect } from "react";
import { updateCourt, createUser } from "../Services/Api";
import { tokenData } from "../Services/Config";


function InsertUsers({ isOpen, onClose, editSingleUser, getAllUsersData }) {

//   const [updateform, setUpdateForm] = useState({
//     id: editSingleUser ? (editSingleUser.id ? editSingleUser.id : "") : "",
//     name: editSingleUser ? (editSingleUser.name ? editSingleUser.name : "") : "",
//     identificationNumber: editSingleUser ? (editSingleUser.identificationNumber ? editSingleUser.identificationNumber : "") : "",
//     fullAddress: editSingleUser ? (editSingleUser.fullAddress ? editSingleUser.fullAddress : "") : "",
//     roleId: editSingleUser ? (editSingleUser.roleId ? editSingleUser.roleId : "") : "",
//     role: editSingleUser ? (editSingleUser.role ? editSingleUser.role : "") : "",
//     stateId: editSingleUser ? (editSingleUser.stateId ? editSingleUser.stateId : "") : "",
//     state: editSingleUser ? (editSingleUser.state ? editSingleUser.state : "") : "",
//     districtId: editSingleUser ? (editSingleUser.districtId ? editSingleUser.districtId : "") : "",
//     district: editSingleUser ? (editSingleUser.district ? editSingleUser.district : "") : "",

// });

// useEffect(() => {
//   if (editSingleUser) {
//     setUpdateForm({
//       id: editSingleUser.id || "",
//       name: editSingleUser.name || "",
//       identificationNumber: editSingleUser.identificationNumber || "",
//       fullAddress: editSingleUser.fullAddress || "",
//       roleId: editSingleUser.roleId || "",
//       role: editSingleUser.role || "",
//       stateId: editSingleUser.stateId || "",
//       state: editSingleUser.state || "",
//       districtId: editSingleUser.districtId || "",
//       district: editSingleUser.district || "",
//     });
//   } else {
//     setUpdateForm({
//       name: "",
//       identificationNumber:  "",
//       fullAddress:  "",
//       roleId:  "",
//       stateId:  "",
//       state:  "",
//       districtId:  "",
//       district:  "",
//     });
//   }
// }, [editSingleUser]);

  const [userDataList, setuserDataList] = useState([]);

  const [form, setForm] = useState({
    UserName: "",
    PasswordHash: "123",
    roleId: tokenData.role,
    districtId: tokenData.districtId,
    courtId: tokenData.courtId,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  // const updatehandleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUpdateForm({
  //     ...updateform,
  //     [name]: value,
  //   });
  // };
  // const handleSelectChange = (name, value) => {
  //   setSelectedValues({
  //     ...selectedValues,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(e.target.textContent === "Edit") {
      const res = await updateCourt(editSingleUser.id,updateform);
    }
    else if(e.target.textContent === "Add") {
      const res = await createUser(form)
    }
    setForm({
      UserName: "",
      PasswordHash: "123",
      roleId: tokenData.role,
      districtId: tokenData.districtId,
      courtId: tokenData.courtId,
    });
    await getAllUsersData();
    onClose();
  };

  // if(editSingleUser)
  // {
  //   return (<>
  //   <div
  //       className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
  //         isOpen ? "block" : "hidden"
  //       }`}
  //     >
  //       <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-2xl">
  //         <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
  //           <div className="grid grid-cols-1 gap-1 md:gap-5 md:grid-cols-3">
  //           <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="district" className="block font-semibold mb-2">
  //                 Select Court Type:
  //               </label>
  //               <select
  //                 value={updateform.roleId}
  //                 onChange={(e) =>{
  //                   updatehandleSelectChange("RoleId", e.target.value)
  //                   setUpdateForm({
  //                     ...updateform,
  //                     "role" : {
  //                       "id": e.target.value,
  //                       "role": e.target.options[e.target.selectedIndex].id,
  //                     }
  //                   });
  //                 }
  //               }
  //                 id="roleId"
  //                 name="roleId"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               >
  //                 <option value="" disabled>Select Court Type</option>
  //                 {userDataList.map((user) => (
  //                   <option key={user.id} value={user.id} id={user.name}>
  //                     {user.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>
  //             <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="state" className="block font-semibold mb-2">
  //                 Court Name:
  //               </label>
  //               <input
  //                 defaultValue={updateform.name}
  //                 onChange={updatehandleInputChange}
  //                 type="text"
  //                 name="name"
  //                 placeholder="Court Name"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               />
  //             </div>
  //             <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="state" className="block font-semibold mb-2">
  //                 Identification Number:
  //               </label>
  //               <input
  //                 defaultValue={updateform.identificationNumber}
  //                 onChange={updatehandleInputChange}
  //                 type="text"
  //                 name="identificationNumber"
  //                 placeholder="identificationNumber"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               />
  //             </div>
  //             <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="state" className="block font-semibold mb-2">
  //                 Select State:
  //               </label>
  //               <select
  //                 value={updateform.stateId}
  //                 onChange={(e) => {
  //                   updatehandleSelectChange("StateId", e.target.value)
  //                   setUpdateForm({
  //                     ...updateform,
  //                     "state" : {
  //                       "id": e.target.value,
  //                       "state": e.target.options[e.target.selectedIndex].id,
  //                     }
  //                   });
  //                 }}
  //                 id="state"
  //                 name="stateId"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               >
  //                 <option value="" disabled>select state</option>
  //                 {stateDataList.map((state) => (
  //                   <option key={state.id} value={state.id} id={state.name}>
  //                     {state.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>
  //             <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="district" className="block font-semibold mb-2">
  //                 Select District:
  //               </label>
  //               <select
  //                 value={updateform.districtId}
  //                 onChange={(e) => {
  //                   updatehandleSelectChange("DistrictId", e.target.value)
  //                   setUpdateForm({
  //                     ...updateform,
  //                     "district" : {
  //                       "id": e.target.value,
  //                       "district": e.target.options[e.target.selectedIndex].id,
  //                     }
  //                   });
  //                 }}
  //                 id="district"
  //                 name="districtId"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               >
  //                 <option value="" disabled>Select a district</option>
  //                 {districtDataList.map((district) => (
  //                   <option key={district.id} value={district.id} id={district.name}>
  //                     {district.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>
  //             <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
  //               <label htmlFor="district" className="block font-semibold mb-2">
  //                 fullAddress
  //               </label>
  //               <input
  //                 defaultValue={updateform.fullAddress}
  //                 onChange={updatehandleInputChange}
  //                 type="text"
  //                 name="fullAddress"
  //                 placeholder="fullAddress"
  //                 className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
  //               />
  //             </div>
  //             <div className="flex justify-end items-center p-4 space-x-2  rounded-b">
  //               <button
  //                 onClick={handleSubmit}
  //                 className="bg-[#10375e] hover:bg-[#185490] text-white font-semibold hover:text-white py-2 px-4 border  rounded focus:outline-none focus:ring-0"
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 onClick={onClose}
  //                 className="bg-white text-[#10375e] font-bold  py-2 px-5 border hover:border-[#10375e] rounded focus:outline-none focus:ring-0"
  //               >
  //                 Cancel
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  //   );  
  // }

  return (
    <>
    <div className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
            <div className="h-full relative rounded-xl bg-white dark:border-slate-700 dark:bg-slate-800 text-slate-800 dark:text-slate-100 bg-clip-border shadow-lg">
                <div>
                    <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                        <label htmlFor="state" className="block font-semibold mb-2">User Name:</label>
                        <input
                            value={form.UserName}
                            onChange={handleInputChange}
                            type="text"
                            name='UserName'
                            placeholder="User Name"
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

export default InsertUsers;
