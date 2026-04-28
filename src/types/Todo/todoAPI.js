import axios from "axios";


export const addTodo = async (data) => {
  const res = await axios.post(
    "https://dummyjson.com/todos/add",
    data
  );
  return res.data;
};


export const fetchTodos = async (page) => {
  const res = await axios.get(
    `https://dummyjson.com/todos?limit=5&skip=${(page - 1) * 5}`
  );
  return res.data;
};


export const updateTodo = async ({ id, data }) => {
  const res = await axios.put(
    `https://dummyjson.com/todos/${id}`,
    data
  );
  return res.data;
};


export const deleteTodo = async (id) => {
  await axios.delete(`https://dummyjson.com/todos/${id}`);
};