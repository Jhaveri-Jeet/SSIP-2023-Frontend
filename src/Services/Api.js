import axios from "axios";
import { prefixUrl } from "./Config";
import Cookies from "js-cookie";

// ------------------ All Apis for Login ------------------
export const checkUser = async (userId, passwordHash) => {
  try {
    const response = await axios.get(
      `${prefixUrl}/CheckUser/${userId}/${passwordHash}`
    );

    const token = response.data.token;
    Cookies.set("access_token", token, { httpOnly: false });

    return response;
  } catch (error) {
    return false;
  }
};

// ------------------ All Apis for User ------------------
export const createUser = async (roleId, districtId, courtId, data) => {
  try {
    const response = await axios.post(
      `${prefixUrl}/users/${roleId}/${districtId}/${courtId}`,
      data
    );
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
export const getCaseDetails = async (id) => {
  try {
    const response = await axios.get(`${prefixUrl}/cases/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictPendingCasesCount = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/TotalPendingCases/1`);
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictRunningCasesCount = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/TotalRunningCases/1`);
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCompletedCasesCount = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/TotalCompletedCases/1`);
    return response.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalCasesCount/1`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllHighCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalCasesCount/3`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllPendingHighCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalPendingCases/3`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllRunningHighCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalRunningCases/3`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCompletedHighCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalCompletedCases/3`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllSupremeCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalCasesCount/4`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllPendingSupremeCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalPendingCases/4`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllRunningSupremeCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalRunningCases/4`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCompletedSupremeCasesCount = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/TotalCompletedCases/4`);
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllCases = async () => {
  try {
    const data = await axios.get(`${prefixUrl}/cases`);
    return data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllDistrictCourtCases = async () => {
  try {
    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/1`
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllSupremeCourtCases = async () => {
  try {
    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/4`
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getAllHighCourtCases = async () => {
  try {
    const data = await axios.get(
      `${prefixUrl}/FetchCasesIncludingTransfered/3`
    );
    return data.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const getCase = async (caseId) => {
  try {
    const res = await axios.get(`${prefixUrl}/cases/${caseId}`);
    return res.data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const deleteCase = async (deleteCaseId) => {
  try {
    const data = await axios.delete(`${prefixUrl}/cases/${deleteCaseId}`);
    return data;
  } catch (error) {
    console.log("Error ouccur in api call", error);
  }
};
export const updateCase = async (data) => {
  console.log("Data :", data);
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/cases/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addCase = async (
  caseTypeId,
  courtId,
  actId,
  advocateId,
  attorneyId,
  roleId,
  data
) => {
  try {
    const response = await axios.post(
      `${prefixUrl}/cases/${caseTypeId}/${courtId}/${actId}/${advocateId}/${attorneyId}/${roleId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Advocate ------------------
export const getAllAdvocates = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/advocates`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAdvocate = async (advocateId) => {
  const data = await axios.get(`${prefixUrl}/advocates/${advocateId}`);
  return data;
};
export const deleteAdvocate = async (deleteAdvocateId) => {
  const data = await axios.delete(`${prefixUrl}/advocates/${deleteAdvocateId}`);
  return data;
};
export const addAdvocate = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/advocates`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const editAdvocateAPI = async (data) => {
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/advocates/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ------------------ All Apis for Act ------------------
export const getAllActs = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/acts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAct = async (actId) => {
  const response = await axios.get(`${prefixUrl}/acts/${actId}`);
  return response.data;
};
export const deleteAct = async (deleteActId) => {
  const response = await axios.delete(`${prefixUrl}/acts/${deleteActId}`);
  return response.data;
};
export const addAct = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/acts`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateAct = async (data) => {
  console.log("Data :", data);
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/acts/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ------------------ All Apis for Court ------------------
export const getCourts = async (userRoleId, districtId) => {
  try {
    const response = await axios.get(
      `${prefixUrl}/FetchCourtAccRoleAndDis/${userRoleId}/${districtId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourts = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/courts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCourt = async (courtId) => {
  const response = await axios.get(`${prefixUrl}/courts/${courtId}`);
  return response.data;
};

export const addCourt = async (RoleId, StateId, DistrictId, data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${prefixUrl}/courts/${RoleId}/${StateId}/${DistrictId}`,
      data
    );
    if (response.status === 200) {
      var courtId = response.data;
      var courtData = {
        UserName: data.name,
        PasswordHash: "123",
      };
      await createUser(RoleId, DistrictId, courtId, courtData);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourt = async (courtId, data) => {
  try {
    const response = await axios.put(`${prefixUrl}/courts/${courtId}/`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for CaseType ------------------
export const getAllCaseType = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/CaseType`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addCaseType = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/CaseType`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCaseType = async (data) => {
  console.log("Data :", data);
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/CaseType/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCaseType = async (caseTypeId) => {
  try {
    const response = await axios.get(`${prefixUrl}/CaseType/${caseTypeId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCaseType = async (deleteCaseTypeId) => {
  try {
    const response = await axios.delete(
      `${prefixUrl}/CaseType/${deleteCaseTypeId}`
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
    const response = await axios.post(
      `${prefixUrl}/States`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
      data
    );
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
    const response = await axios.put(
      `${prefixUrl}/states/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
      data
    );
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
    const response = await axios.post(`${prefixUrl}/Districts`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDistrict = async (data) => {
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/Districts/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Sections ------------------

export const getAllSections = async () => {
  try {
    const actAllData = await getAllActs();
    const response = await axios.get(`${prefixUrl}/sections`);
    const data = [response.data, actAllData];
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSection = async (sectionId) => {
  const response = await axios.get(`${prefixUrl}/sections/${sectionId}`);
  return response.data;
};
export const deleteSection = async (deletesectionId) => {
  console.log("Id:::", deletesectionId);
  const response = await axios.delete(
    `${prefixUrl}/sections/${deletesectionId}`
  );
  return response.data;
};
export const addSections = async (actId, data) => {
  try {
    const response = await axios.post(`${prefixUrl}/sections/${actId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSection = async (data) => {
  console.log("Update section Data :", data);
  try {
    let id = data.id;
    const response = await axios.put(`${prefixUrl}/sections/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// ------------------ All Apis for Hearing ------------------
export const getHearing = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/HearingAccCase/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleHearing = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/Hearing/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallHearing = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/Hearing`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteHearing = async (Id) => {
  try {
    const response = await axios.delete(`${prefixUrl}/Hearing/${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateHearing = async (data) => {
  try {
    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/hearing/${Id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addHearing = async (data) => {
  try {
    const caseId = data.caseId;
    const response = await axios.post(`${prefixUrl}/Hearing/${caseId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Evidences ------------------
export const getEvidences = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/EvidenceAccCase/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleEvidence = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/Evidences/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallEvidences = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/Evidences`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteEvidence = async (Id) => {
  try {
    const response = await axios.delete(`${prefixUrl}/Evidences/${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateEvidence = async (data) => {
  try {
    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/Evidences/${Id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addEvidence = async (formData) => {
  try {
    const caseId = data.caseId;
    const response = await axios.post(`${prefixUrl}/Evidences/${caseId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// ------------------ All Apis for Winesses ------------------
export const getWitnesses = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/WitnessAccCase/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleWitness = async (caseId) => {
  try {
    console.log(caseId);
    const response = await axios.get(`${prefixUrl}/Witness/${caseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getallWitnesses = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/Witness`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteWitness = async (Id) => {
  try {
    const response = await axios.delete(`${prefixUrl}/Witness/${Id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateWitness = async (data) => {
  try {
    const Id = data.id;
    const response = await axios.put(`${prefixUrl}/Witness/${Id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addWitness = async (formData) => {
  try {
    console.log(formData);
    const caseId = data.caseId;
    const response = await axios.post(
      `${prefixUrl}/Witness/${caseId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
