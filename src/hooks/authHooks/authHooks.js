import { useMutation } from "@tanstack/react-query";
import { login, logout, register } from "../../types/Auth/authAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/dashboard"); 
      }, 300);
    },

    onError: () => {
      toast.error("Invalid username or password");
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successful");

    setTimeout(() => {
      navigate("/"); 
    }, 300);
  };

  return { logout: logoutUser };
};