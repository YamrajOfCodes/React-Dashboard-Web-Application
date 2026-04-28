import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";


export const fetchUsers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data; 
};

export const addUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/add`, data);
  return res.data;
};

export const updateUser = async ({ id, data }) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};


export const deleteUser = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id; 
};