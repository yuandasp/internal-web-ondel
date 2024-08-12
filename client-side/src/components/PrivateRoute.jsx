import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../helpers/constant";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/authStore";

function PrivateRoute() {
  const { user } = useAuthStore();

  if (!localStorage.getItem(AUTH_TOKEN) || !user) {
    Swal.fire({
      icon: "warning",
      title: "Please login first!",
    });

    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
}

export default PrivateRoute;
