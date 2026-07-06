import axios from "axios";

const API = axios.create({
  baseURL: "https://fivescore-fullstack-mvp-2.onrender.com",
});

export default API;