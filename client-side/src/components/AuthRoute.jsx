import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../helpers/constant";
import { useAuthStore } from "../store/authStore";

function AuthRoute() {
  const { user } = useAuthStore();

  if (localStorage.getItem(AUTH_TOKEN)) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
}

export default AuthRoute;
