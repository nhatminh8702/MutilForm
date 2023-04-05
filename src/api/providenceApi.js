import axiosClient from "./axiosClient";

const provincesApi = {
  get(id) {
    const url = "/?depth=" + id;
    return axiosClient.get(url);
  },
};
export default provincesApi;
