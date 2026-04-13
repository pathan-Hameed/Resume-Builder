import axios from "axios";
import { getToken } from "../utils/auth";

const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/resumes`
  : "/api/resumes";

export const createResume = (data) => {
  return axios.post(BASE, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const getMyResumes = () => {
  return axios.get(BASE, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const deleteResume = (id) => {
  return axios.delete(`${BASE}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const downloadPdf = (id) => {
  return axios.get(`${BASE}/${id}/pdf`, {
    responseType: "blob",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};