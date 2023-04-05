import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://provinces.open-api.vn/api/",
  headers :{
    "Content-Type": 'application/json'
  }
});
export default axiosClient;
