
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodos,addTodo,updateTodo,deleteTodo } from "../../types/Todo/todoAPI";
import toast from "react-hot-toast";


export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onSuccess: (newTodo) => {
      toast.success("Todo added");

      queryClient.setQueriesData(
        { queryKey: ["todos"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: [newTodo, ...oldData.todos],
          };
        }
      );
    },
  });
};



export const useTodos = (page) => {
  return useQuery({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page),
    keepPreviousData: true, 
  });
};


export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    onSuccess: (updatedTodo) => {
      toast.success("Todo updated");

      queryClient.setQueriesData(
        { queryKey: ["todos"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: oldData.todos.map((t) =>
              t.id === updatedTodo.id ? updatedTodo : t
            ),
          };
        }
      );
    },
  });
};


export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: (_, deletedId) => {
      toast.success("Todo deleted");

      queryClient.setQueriesData(
        { queryKey: ["todos"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            todos: oldData.todos.filter((t) => t.id !== deletedId),
          };
        }
      );
    },
  });
};