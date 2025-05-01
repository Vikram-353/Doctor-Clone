// utils/api.js

import axios from "axios";

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

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/list-doctors-with-filter`,
    {
      params,
    }
  );
  return response;
};

// export const listDoctors = (filters) => {
//   return axios.get(`${API_URL}/api/list-doctors-with-filter`, {
//     params: filters,
//   });
// };

export const addDoctor = (doctorData) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/add-doctor`,
    doctorData
  );
};
