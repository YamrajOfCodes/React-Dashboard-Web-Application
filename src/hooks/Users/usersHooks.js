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
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: Infinity, 
    gcTime: Infinity,
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,

    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];

        return {
          ...old,
          users: [
            {
              ...newUser,
              id: Date.now(),
            },
            ...users,
          ],
        };
      });

      return { prevData };
    },

    onError: (_err, _newUser, context) => {
      queryClient.setQueryData(["users"], context.prevData);
      toast.error("Add failed");
    },

    onSuccess: () => {
      toast.success("User added");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const isLocal = String(id).length > 10;

      if (isLocal) {
        return { id, data }; 
      }

      return updateUser({ id, data });
    },

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];

        return {
          ...old,
          users: users.map((u) =>
            u.id === id ? { ...u, ...data } : u
          ),
        };
      });

      return { prevData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["users"], context.prevData);
      toast.error("Update failed");
    },

    onSuccess: () => {
      toast.success("Updated successfully");
    },
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const isLocal = String(id).length > 10;

      if (isLocal) {
        return id; 
      }

      return deleteUser(id);
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const prevData = queryClient.getQueryData(["users"]);

      queryClient.setQueryData(["users"], (old) => {
        const users = old?.users || [];

        return {
          ...old,
          users: users.filter((u) => u.id !== id),
        };
      });

      return { prevData };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["users"], context.prevData);
      toast.error("Delete failed");
    },

    onSuccess: () => {
      toast.success("Deleted successfully");
    },
  });
};