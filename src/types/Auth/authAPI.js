import { api } from '../../lib/axios';
import axios from "axios";

export const login = async (data) => {
  const res = await axios.post(
    "https://dummyjson.com/user/login",
    data
  );
  return res.data;
};


export const register = async (data) => {
  const res = await api.post('/auth/insertUser', data);
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem('login');
  await api.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
