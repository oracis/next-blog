import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return {
        code: -1,
        msg: "Unexpected Error",
        data: null,
      };
    }
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
