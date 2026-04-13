import axios from "axios";
import { getToken } from "../utils/auth";

const API = "/api/resumes";

export const createResume = (data) => {
  return axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const getMyResumes = () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const deleteResume = (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const downloadPdf = (id) => {
  return axios.get(`${API}/${id}/pdf`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
