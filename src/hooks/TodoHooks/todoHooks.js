import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../types/Todo/todoAPI";

import toast from "react-hot-toast";

const TODO_KEY = ["todos"];

export const useTodos = (page) => {
  return useQuery({
    queryKey: [...TODO_KEY, page],
    queryFn: () => fetchTodos(page),

    staleTime: Infinity,
    gcTime: Infinity,
  });
};

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

          const todos = oldData?.todos || [];

          return {
            ...oldData,
            todos: [
              { ...newTodo, id: Date.now() },
              ...todos,
            ],
          };
        }
      );
    },
  });
};


export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const isLocal = String(id).length > 10;
      if (isLocal) {
        return { id, ...data };
      }

      return updateTodo({ id, data });
    },

    onSuccess: (updated) => {
      queryClient.setQueriesData({ queryKey: ["todos"] }, (old) => {
        const todos = old?.todos || [];

        return {
          ...old,
          todos: todos.map((t) =>
            t.id === updated.id ? { ...t, ...updated } : t
          ),
        };
      });
    },
  });
};


export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const isLocalTodo = (id) => String(id).length > 10;

  return useMutation({
    mutationFn: async (id) => {
      const local = isLocalTodo(id);
      if (!local) {
        await deleteTodo(id);
      }

      return id;
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevData = queryClient.getQueryData(["todos"]);

      queryClient.setQueriesData({ queryKey: ["todos"] }, (old) => {
        const todos = old?.todos || [];

        return {
          ...old,
          todos: todos.filter((t) => t.id !== id),
        };
      });

      return { prevData };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["todos"], context.prevData);
      toast.error("Delete failed");
    },

    onSuccess: () => {
      toast.success("Todo deleted");
    },
  });
};