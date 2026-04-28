import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, register } from "../../types/Auth/authAPI"

import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';
import { AxiosError } from 'axios';


export const useLogin = () => {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data));
      toast.success("login successfull")
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    },

    onError: () => {
      toast.error("Invalid username or password");
    },
  });
};

export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");;

    toast.success("logout successfull");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return { logout };
};