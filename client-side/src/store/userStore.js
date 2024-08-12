import axios from "axios";
import { create } from "zustand";
import { AUTH_TOKEN } from "../helpers/constant";

export const useUserStore = create((set, get) => ({
  employees: [],
  employee: {},
  fetchAllEmployee: async () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}employee`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      set((state) => ({
        data: (state.employees = response.data.data),
      }));
    } catch (error) {}
  },
  fetchDetailEmployee: async (id) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}employee/${id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      set((state) => ({
        data: (state.employee = response.data.data || {}),
      }));
    } catch (error) {}
  },
  createEmployee: async (d) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}employee`,
        d,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      await get().fetchAllEmployee();
    } catch (error) {}
  },
  editEmployee: async (id, data) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_API_BE}employee/${id}`,
        data,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      await get().fetchAllEmployee();
    } catch (error) {}
  },
  assignRole: async (id, data) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_API_BE}employee/r/${id}`,
        data,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      await get().fetchAllEmployee();
    } catch (error) {}
  },
  changePasswordEmployee: async (id, data) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_API_BE}employee/p/${id}`,
        data,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      await get().fetchAllEmployee();
    } catch (error) {}
  },
}));
