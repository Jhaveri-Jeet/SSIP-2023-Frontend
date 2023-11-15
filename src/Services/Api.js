import axios from "axios";
import { prefixUrl } from "./Config";

// ------------------ All Apis for Role ------------------
export const getAllRoles = async () => {
  const response = await axios.get(`${prefixUrl}/roles`).then((res) => {
    return res.data;
  });
  return response;
};

// ------------------ All Apis for Case ------------------
export const getCaseDetails = async (id) => {
  const response = await axios.get(`${prefixUrl}/cases/${id}`);
  return response.data;
};
export const getAllDistrictPendingCasesCount = async () => {
  const response = await axios.get(`${prefixUrl}/TotalPendingCases/1`);
  return response.data;
};
export const getAllDistrictRunningCasesCount = async () => {
  const response = await axios.get(`${prefixUrl}/TotalRunningCases/1`);
  return response.data;
};
export const getAllDistrictCompletedCasesCount = async () => {
  const response = await axios.get(`${prefixUrl}/TotalCompletedCases/1`);
  return response.data;
};
export const getAllDistrictCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalCasesCount/1`);
  return data.data;
};
export const getAllHighCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalCasesCount/3`);
  return data.data;
};
export const getAllPendingHighCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalPendingCases/3`);
  console.log("pending",data.data)
  return data.data;
};
export const getAllRunningHighCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalRunningCases/3`);
  console.log(data.data)
  return data.data;
};
export const getAllCompletedHighCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalCompletedCases/3`);
  console.log(data.data)
  return data.data;
};
export const getAllSupremeCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalCasesCount/4`);
  return data.data;
};
export const getAllPendingSupremeCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalPendingCases/4`);
  console.log("pending",data.data)
  return data.data;
};
export const getAllRunningSupremeCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalRunningCases/4`);
  console.log(data.data)
  return data.data;
};
export const getAllCompletedSupremeCasesCount = async () => {
  const data = await axios.get(`${prefixUrl}/TotalCompletedCases/4`);
  console.log(data.data)
  return data.data;
};
export const getAllCases = async () => {
  const data = await axios.get(`${prefixUrl}/cases`);
  return data;
};
export const getAllDistrictCourtCases = async () => {
  const data = await axios.get(`${prefixUrl}/FetchCasesIncludingTransfered/1`);
  return data.data;
};
export const getAllSupremeCourtCases = async () => {
  const data = await axios.get(`${prefixUrl}/FetchCasesIncludingTransfered/4`);
  return data.data;
};
export const getAllHighCourtCases = async () => {
  const data = await axios.get(`${prefixUrl}/FetchCasesIncludingTransfered/3`);
  return data.data;
};
export const getCase = async (caseId) => {
  const res = await axios.get(`${prefixUrl}/cases/${caseId}`);
  // console.log("res ,",res);
  return res.data;
};
export const deleteCase = async (deleteCaseId) => {
  const data = await axios.delete(`${prefixUrl}/cases/${deleteCaseId}`);
  return data;
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
    const response = await axios.get(`${prefixUrl}/FetchCourtAccRoleAndDis/${userRoleId}/${districtId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

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

export const addCourt = async (RoleId,StateId,DistrictId,data) => {
  try {
    const response = await axios.post(`${prefixUrl}/courts/${RoleId}/${StateId}/${DistrictId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourt = async (courtId,data) => {
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

// ------------------ All Apis for Witness ------------------
export const getAllWitness = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/Witness`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const addWitness = async (data, CaseId) => {
  const formData = new FormData();
  formData.append("Image", data.witnessImage);
  console.log(data);
  const response = fetch(`${prefixUrl}/Witness/${CaseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("ok ", response.data);
        return response.data;
      } else {
        console.log("notok ", response.data);
        return response.data;
      }
    })
    .catch((error) => {
      console.log("Error : ", error());
    });

  return response;

  // try {
  //   console.log("Data :", data);
  //   const response = await axios.post(
  //     `${prefixUrl}/Witness/${CaseId}`,
  //     data
  //   );
  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  // }
};

export const getWitness = async (WitnessId) => {
  const response = await axios.get(`${prefixUrl}/Witness?id=${WitnessId}`);
  return response.data;
};

export const deleteWitness = async (deleteWitnessId) => {
  const response = await axios.delete(
    `${prefixUrl}/Witness?id=${deleteWitnessId}`
  );
  return response.data;
};

// ------------------ All Apis for State-----------

export const getAllStates = async () => {
  try {
    const response = await axios.get(`${prefixUrl}/states`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getState = async (stateId) => {
  try {
    const response = await axios.get(`${prefixUrl}/states/${stateId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const addState = async (data) => {
  try {
    const response = await axios.post(`${prefixUrl}/States`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateState = async (data) => {
  try {
    let id = data.id;
    console.log(data);
    const response = await axios.put(`${prefixUrl}/states/${id}`, data);
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
  console.log("Id:::",deletesectionId);
  const response = await axios.delete(`${prefixUrl}/sections/${deletesectionId}`);
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
    const Id=data.id
    const response = await axios.put(`${prefixUrl}/hearing/${Id}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  }

};
export const addHearing = async (data) => {
  try {
    const caseId=data.caseId
    const response = await axios.post(`${prefixUrl}/Hearing/${caseId}`,data);
    return response.data;
  } catch (error) {
    console.log(error);
  }

};