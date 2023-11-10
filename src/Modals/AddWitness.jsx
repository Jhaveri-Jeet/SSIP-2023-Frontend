import { React, useState } from "react";


const AddWitness = ({isOpen, onClose, onSubmitForm, validate}) => {
// validate()

  // if(!isLoggedIn)
  //   window.location.href="/";

    const [form, setForm] = useState({
        WitnessName: "",
        WitnessImage: null,
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({
            ...form,
            WitnessImage: file,
        });
    };

      const handleSubmit = (e) => {
        e.preventDefault();
    
        onSubmitForm(form); 
    
        onClose();
      };

      return (
        <>
          <div
            className={`fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[22rem] sm:w-full sm:max-w-lg">
              <div className="h-full relative rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <div>
                  <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                    <label htmlFor="state" className="block font-semibold mb-2">
                      Witness Name:
                    </label>
                    <input
                      defaultValue={form.Courtname}
                      onChange={handleInputChange}
                      type="text"
                      name="WitnessName"
                      placeholder="Witness name"
                      className="pl-2 inputbox outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                    />
                  </div>
                  <div className="items-center justify-between p-4 rounded-t dark:border-gray-600">
                    <label htmlFor="witnessImage" className="block font-semibold mb-2">
                        Upload Witness Image:
                    </label>
                    <input
                        type="file"
                        name="WitnessImage"
                        accept="image/*" // Allow only image files
                        onChange={handleFileChange}
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

export default AddWitness