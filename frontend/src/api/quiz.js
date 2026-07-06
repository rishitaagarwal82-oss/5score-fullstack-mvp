import axios from "axios";

const API = "http://127.0.0.1:8000";

/**
 * Normalize backend response so UI NEVER breaks
 */
const normalize = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.questions)) return data.questions;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const getQuestions = async (ap) => {
  try {
    const res = await axios.get(
      `${API}/questions/${encodeURIComponent(ap)}`
    );

    return normalize(res.data);
  } catch (err) {
    console.error("Error fetching questions:", err);
    return [];
  }
};

export const getSubjects = async () => {
  try {
    const res = await axios.get(`${API}/subjects`);
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return [];
  }
};

export const getFRQ = async (ap) => {
  try {
    const res = await axios.get(
      `${API}/frq/${encodeURIComponent(ap)}`
    );

    return normalize(res.data);
  } catch (err) {
    console.error("Error fetching FRQs:", err);
    return [];
  }
};