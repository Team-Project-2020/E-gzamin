import axios from '../lib/axiosInstance';

async function login(email: string, password: string): Promise<number> {
  const response = await axios.post('/api/token/', {
    username: email,
    password,
  });
  if (response.status === 200) {
    localStorage.setItem('token', response.data.access);
  }
  return response.status;
}

export default login;
