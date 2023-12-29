import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  let user = false;

  if (localStorage.getItem("userData")) {
    user = true;
  }
  return user;
};

export const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="login" replace state={{ from: location?.pathname }} />
  );
};
export const LoginRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location?.pathname }} />
  );
};
