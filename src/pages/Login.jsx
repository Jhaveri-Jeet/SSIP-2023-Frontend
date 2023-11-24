import { React, useState, useEffect } from "react";
import {
  checkUser,
  getAllDistrict,
  getAllRoles,
  getAllUsers,
} from "../Services/Api";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [passwordHash, setPasswordHash] = useState(null);
  const [data, setData] = useState({
    username: "",
    passwordHash: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    console.log(data);
    if (await checkUser(data)) {
      location.href = "/dashboard";
    } else {
      alert("Wrong Username or Password");
    }
  };

  return (
    <>
      {/* component */}
      <div className="h-screen">
        <div className="flex w-full h-screen justify-center py-10 items-center bg-white">
          <div className="bg-white border bottom-3 py-5 px-8 w-80">
            {/* <img
              src="\src\images\logo.png"
              style={{ marginTop: "-40px", marginBottom: "-50px" }}
              alt="websitelogo"
              className="h-60 w-full"
            /> */}
            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">
              Wellcome to
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7 text-center">
              Indian Judicial System
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={handleInputChange}
                className="pl-2 outline-none border-none"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={handleInputChange}
                className="pl-2 outline-none border-none"
                type="password"
                name="passwordHash"
                id="password"
                placeholder="Password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
