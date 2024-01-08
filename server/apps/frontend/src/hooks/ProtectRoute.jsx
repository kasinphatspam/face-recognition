import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { FallBackPage } from "@/pages/Critical/LoadingPage";

export const ProtectedUser = () => {
  const { user, userStat } = useAuth();
  if (userStat !== "success") {
    return (
      <FallBackPage />
    );
  } else return !!user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const ProtectedOrganization = () => {
  const { user, userStat } = useAuth();
  if (userStat !== "success") {
    return (
      <FallBackPage />
    );
  } else return !!user?.organization ? <Outlet /> : <Navigate to="/new" replace />;
};

export const ProtectedAdmin = () => {
  const { user, userStat } = useAuth();
  if (userStat !== "success") {
    return (
      <FallBackPage />
    )
  }
  return (user.role?.name === 'god') ? <Outlet /> : <Navigate to="/" replace />;
};
