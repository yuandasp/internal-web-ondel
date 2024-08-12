import axios from "axios";
import { create } from "zustand";
import Swal from "sweetalert2";
import { AUTH_TOKEN, USER } from "../helpers/constant";

export const useAuthStore = create((set, get) => ({
  user: {},
  setUser: (userData) => {
    set((state) => ({
      data: (state.user = userData || {}),
    }));
  },
  loginUserHandler: async (d) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}auth/login`,
        d
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Success Login to Web Internal PT Ondel",
      });

      if (response.data?.token) {
        localStorage.setItem(AUTH_TOKEN, response.data?.token);
        localStorage.setItem(USER, JSON.stringify(response.data.data));
        set((state) => ({
          data: (state.user = response.data.data || {}),
        }));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data?.message || "Something went wrong!!",
      });
    }
  },
}));
