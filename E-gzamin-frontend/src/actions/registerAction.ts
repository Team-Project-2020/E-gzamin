/* eslint-disable @typescript-eslint/camelcase */
import axios from '../lib/axiosInstance';

async function register(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
) {
  const response = await axios.post('/rest/users/', {
    username: email,
    password,
    first_name,
    last_name,
  });
  return response.status;
}

export default register;
