import axios from "axios";
import { prefixUrl } from "./Config";
import Cookies from "js-cookie";

// ------------------ All Apis for Login ------------------
export const checkUser = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/CheckUser/`, data);

    const token = response.data.token;
    Cookies.set("access_token", token, { httpOnly: false });

    return response;
  } catch (error) {
    return false;
  }
};

// ------------------ All Apis for User ------------------
export const createUser = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/users/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getAllUsers = async (userRoleId, districtId) => {
  try {
    const response = await axios
      .get(`${prefixUrl}/FetchUserAccCourtAndDis/${userRoleId}/${districtId}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCourtsUsers = async (courtId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios
      .get(`${prefixUrl}/FetchUserAccCourt/${courtId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const checkPassword = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios
      .put(`${prefixUrl}/CheckPassword`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios
      .put(`${prefixUrl}/UpdatePassword`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Role ------------------
export const getAllRoles = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/roles`).then((res) => {
      return res.data;
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getRole = async (userRoleId) => {
  try {
    const response = await axios
      .get(`${prefixUrl}/roles/${userRoleId}`)
      .then((res) => {
        return res.data.name;
      });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Case ------------------
export const getCasesAccToCourt = async (courtId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/FetchCasesIncludingTransferedAccCourt/${courtId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
}

export const getCaseDetails = async (id) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/cases/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictPendingCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/TotalPendingCases/1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictRunningCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/TotalRunningCases/1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCompletedCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/TotalCompletedCases/1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalCasesCount/1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllHighCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalCasesCount/3`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllPendingHighCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalPendingCases/3`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllRunningHighCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalRunningCases/3`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCompletedHighCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalCompletedCases/3`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllSupremeCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalCasesCount/4`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllPendingSupremeCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalPendingCases/4`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllRunningSupremeCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalRunningCases/4`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCompletedSupremeCasesCount = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/TotalCompletedCases/4`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCases = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(`${prefixUrl}/cases`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCourtCases = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllSupremeCourtCases = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/4`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllHighCourtCases = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/3`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getCase = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const res = await axios.get(`${prefixUrl}/cases/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const deleteCase = async (deleteCaseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const data = await axios.delete(`${prefixUrl}/cases/${deleteCaseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const updateCase = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/cases/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addCase = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/cases`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Advocate ------------------
export const getAllAdvocates = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/advocates`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAdvocate = async (advocateId) => {
  try {
    const accessToken = Cookies.get("access_token");
    const data = await axios.get(`${prefixUrl}/advocates/${advocateId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAdvocate = async (deleteAdvocateId) => {
  const data = await axios.delete(
    `${prefixUrl}/advocates/${deleteAdvocateId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
export const addAdvocate = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/advocates`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editAdvocateAPI = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/advocates/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ------------------ All Apis for Act ------------------
export const getAllActs = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/acts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAct = async (actId) => {
  const accessToken = Cookies.get("access_token");
  try {
    const response = await axios.get(`${prefixUrl}/acts/${actId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteAct = async (deleteActId) => {
  const response = await axios.delete(`${prefixUrl}/acts/${deleteActId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const addAct = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/acts`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateAct = async (data) => {
  console.log("Data :", data);
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/acts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Court ------------------
export const getCourts = async (userRoleId, districtId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(
      `${prefixUrl}/FetchCourtAccRoleAndDis/${userRoleId}/${districtId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourts = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/courts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourt = async (courtId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/courts/${courtId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCourt = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/courts/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      var courtId = response.data;
      var courtData = {
        UserName: data.name,
        PasswordHash: "123",
        roleId: data.RoleId,
        districtId: data.DistrictId,
        courtId: courtId,
      };
      await createUser(courtData);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourt = async (courtId, data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.put(`${prefixUrl}/courts/${courtId}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for CaseType ------------------
export const getAllCaseType = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/CaseType`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addCaseType = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/CaseType`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCaseType = async (data) => {
  console.log("Data :", data);
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/CaseType/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCaseType = async (caseTypeId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/CaseType/${caseTypeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCaseType = async (deleteCaseTypeId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.delete(
      `${prefixUrl}/CaseType/${deleteCaseTypeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for State-----------

export const getAllStates = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/states`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getState = async (stateId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/states/${stateId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addState = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(data);
    const response = await axios.post(`${prefixUrl}/states/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateState = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    console.log(data);
    const response = await axios.put(`${prefixUrl}/states/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for District -----------

export const getAllDistrict = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/Districts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDistrict = async (districtId) => {
  try {
    const response = await axios.get(`${prefixUrl}/Districts/${districtId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addDistrict = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.post(`${prefixUrl}/Districts`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDistrict = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/Districts/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Sections ------------------

export const getAllSections = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const actAllData = await getAllActs();
    const response = await axios.get(`${prefixUrl}/sections`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = [response.data, actAllData];
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSection = async (sectionId) => {
  const response = await axios.get(`${prefixUrl}/sections/${sectionId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const deleteSection = async (deletesectionId) => {
  console.log("Id:::", deletesectionId);
  const response = await axios.delete(
    `${prefixUrl}/sections/${deletesectionId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const addSections = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");
    console.log("session data :", data);
    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }
    const response = await axios.post(`${prefixUrl}/sections`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSection = async (data) => {
  console.log("Update section Data :", data);
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    let id = data.id;
    const response = await axios.put(`${prefixUrl}/sections/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ------------------ All Apis for Hearing ------------------
export const getHearing = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }
    const response = await axios.get(`${prefixUrl}/HearingAccCase/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleHearing = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }
    const response = await axios.get(`${prefixUrl}/Hearing/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallHearing = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/Hearing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteHearing = async (Id) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.delete(`${prefixUrl}/Hearing/${Id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateHearing = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/hearing/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addHearing = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");
    console.log("Hearing :", data);
    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const caseId = data.caseId;
    const response = await axios.post(`${prefixUrl}/Hearing`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Evidences ------------------
export const getEvidences = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/EvidenceAccCase/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEvidence = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/Evidences/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallEvidences = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/Evidences`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteEvidence = async (Id) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.delete(`${prefixUrl}/Evidences/${Id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateEvidence = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/Evidences/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addEvidence = async (formData) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const caseId = data.caseId;
    const response = await axios.post(
      `${prefixUrl}/Evidences/${caseId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Winesses ------------------
export const getWitnesses = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/WitnessAccCase/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleWitness = async (caseId) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/Witness/${caseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallWitnesses = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/Witness`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteWitness = async (Id) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.delete(`${prefixUrl}/Witness/${Id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateWitness = async (data) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/Witness/${Id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addWitness = async (formData) => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    console.log(formData);
    const caseId = data.caseId;
    const response = await axios.post(
      `${prefixUrl}/Witness/${caseId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for GetAll Court For TransferTo ------------------
export const getAllTransferHighCourts = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/FetchCourtsAccRole/3`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("all Courts", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransferSupremeCourts = async () => {
  try {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("Token not found.");
      return null;
    }

    const response = await axios.get(`${prefixUrl}/FetchCourtsAccRole/4`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("all Courts", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis For Sending Mail And Sms On Hearing------------------

export const sendMailForHearing = async (data) =>{
  try {
    const response = await axios.post(`${prefixUrlForMailAndSms}/api/email`,data).then((response) =>{
      console.log("first")
    return response;
    })
  } catch (error) {
    console.log("error in calling mail api", error);
  }
}

export const sendSmsForHearing = async (data) =>{
  try {
    const response = await axios.post(`${prefixUrlForMailAndSma}/api/sms`,data).then((response) =>{
    return response;
    })
  } catch (error) {
    console.log("error in calling mail api", error);
  }
}