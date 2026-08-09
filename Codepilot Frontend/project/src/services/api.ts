import axios from "axios";

const api = axios.create({
    baseURL: "https://codepilot-backend-emrh.onrender.com/api/chat",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
