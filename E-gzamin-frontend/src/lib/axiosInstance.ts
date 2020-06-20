import axios from 'axios';

const backendURL = 'http://89.70.240.11:8000';

export function authHeader() {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: 'Bearer ' + token };
  }
  return {};
}

function axiosHeaders() {
  return {
    ...authHeader(),
    'content-type': 'application/json',
  };
}

const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: axiosHeaders(),
});

axiosInstance.interceptors.request.use(
  function(config) {
    if (config.headers.Authorization === undefined) {
      config.headers = axiosHeaders();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
