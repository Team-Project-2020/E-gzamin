import axios from '../lib/axiosInstance';

async function register(email: string, password: string) {
  const response = await axios.post('/rest/users/', {
    username: email,
    password,
  });
  return response.status;
}

export default register;
