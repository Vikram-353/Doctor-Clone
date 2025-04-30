// utils/api.js

import axios from "axios";

const API_URL = "http://localhost:5000"; // your backend base URL

export const listDoctors = async ({
  page = 1,
  limit = 10,
  sortBy = "Experience",
  query,
  ...filters
}) => {
  const params = {
    page,
    limit,
    sortBy,
    query,

    ...filters,
  };

  const response = await axios.get(`${API_URL}/api/list-doctors-with-filter`, {
    params,
  });
  return response;
};

// export const listDoctors = (filters) => {
//   return axios.get(`${API_URL}/api/list-doctors-with-filter`, {
//     params: filters,
//   });
// };

export const addDoctor = (doctorData) => {
  return axios.post(`${API_URL}/api/add-doctor`, doctorData);
};
