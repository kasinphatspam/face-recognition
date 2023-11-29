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
  const { organizeData, orgStat } = useAuth();
  if (orgStat !== "success") {
    return (
      <FallBackPage />
    );
  } else return !!organizeData ? <Outlet /> : <Navigate to="/new" replace />;
};

export const ProtectedAdmin = () => {
  const { admin } = useAuth();
  return !!admin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
