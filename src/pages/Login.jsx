import { React, useState, useEffect } from "react";
import { checkUser, getAllDistrict, getAllRoles, getAllUsers } from "../Services/Api";

const Login = () => {

  const [isSelectUserRole, setIsSelectUserRole] = useState(false);
  const [isSelectDistrict, setIsSelectDistrict] = useState(false);
  const [isSelectUser, setIsSelectUser] = useState(false);

  const [userRoles, setUserRoles] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [users, setUsers] = useState([]);

  const [userRoleId, setUserRoleId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    getRoles();
    getDistricts();
  }, []);
  
  const getRoles = async () => {
    setUserRoles(await getAllRoles());
  }

  const getDistricts = async () => {
    setDistricts(await getAllDistrict());
  }

  const getUsers = async () => {
    setUsers(await getAllUsers(userRoleId,districtId));
  }
  
  useEffect(() => {
    if(districtId !== null)
      getUsers();
  }, [districtId]);

  const handleLogin = async () => {
    if(await checkUser(userId, password)) {
      localStorage.setItem("isAuthenticated",true);
      localStorage.setItem("userRoleId", userRoleId);
      localStorage.setItem("districtId", districtId);
      localStorage.setItem("userId", userId);
      location.href = "/dashboard"
    }
    else {
      alert("Wrong Username or Password");
    }
  };

  return (
    <>
      {/* component */}
      <div className="h-screen">
        <div className="flex w-full h-screen justify-center py-10 items-center bg-white">
          <div className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
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
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <select
                onChange={(e) => {
                  setIsSelectUserRole(true);
                  setUserRoleId(e.target.value);
                  setDistricts([]);
                  setUsers([]);
                  getDistricts();
                }}
                id="courts-select"
                className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
              >
                <option selected>Choose an Role</option>
                {userRoles.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {isSelectUserRole && (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <select
                  onChange={(e) => {
                    setIsSelectDistrict(true);
                    setDistrictId(e.target.value);
                    getUsers();
                  }}
                  id="district-select"
                  className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option selected>Choose District</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isSelectDistrict && (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <select
                  onChange={(e) => {
                    setIsSelectUser(true);
                    setUserId(e.target.value);
                  }}
                  id="district-court-select"
                  className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option selected>Choose User</option>
                  {users
                    ? users.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.userName}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            )}

            {isSelectUser && (
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="pl-2 outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
            )}
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
