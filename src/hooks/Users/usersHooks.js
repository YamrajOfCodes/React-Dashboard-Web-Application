import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../types/User/userAPI";
import toast from "react-hot-toast";

const QUERY_KEY = ["users"];

export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchUsers,
  });
};


export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,

    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      const prevData = queryClient.getQueryData(QUERY_KEY) || { users: [] };

      queryClient.setQueryData(QUERY_KEY, (old) => {
        const users = old?.users ?? old ?? [];

        return {
          ...old,
          users: [
            { id: Date.now(), ...newUser },
            ...users,
          ],
        };
      });

      return { prevData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context.prevData);
      toast.error("Failed to add user");
    },

    onSuccess: () => {
      toast.success("User added");
    },
  });
};


export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      const prevData = queryClient.getQueryData(QUERY_KEY) || { users: [] };

      queryClient.setQueryData(QUERY_KEY, (old) => {
        const users = old?.users ?? old ?? [];

        return {
          ...old,
          users: users.map((u) =>
            u.id === id ? { ...u, ...data } : u
          ),
        };
      });

      return { prevData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context.prevData);
      toast.error("Failed to update user");
    },

    onSuccess: () => {
      toast.success("User updated");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      const prevData = queryClient.getQueryData(QUERY_KEY) || { users: [] };

      queryClient.setQueryData(QUERY_KEY, (old) => {
        const users = old?.users ?? old ?? [];

        return {
          ...old,
          users: users.filter((u) => u.id !== id),
        };
      });

      return { prevData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEY, context.prevData);
      toast.error("Failed to delete user");
    },

    onSuccess: () => {
      toast.success("User deleted");
    },
  });
};