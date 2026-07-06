import axios from "axios";

/**
 * ✅ YOUR REAL BACKEND (Render)
 */
const API = "https://fivescore-fullstack-mvp-2.onrender.com";

/**
 * Normalize backend response so UI never breaks
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