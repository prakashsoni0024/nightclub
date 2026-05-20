import axios from "axios";

const API = axios.create({
  baseURL: "https://nightclub.onrender.com/api",
});

export default API;