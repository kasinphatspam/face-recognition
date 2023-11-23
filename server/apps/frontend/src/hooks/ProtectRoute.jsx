import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedUser = () => {
	const { user } = useAuth();

	return !!user ? <Outlet /> : <Navigate to="/"  replace />;
};

export const ProtectedOrganization = () => {
	const { organizeData } = useAuth();

	return !!organizeData ? <Outlet /> :  <Navigate to="/"  replace />;
};

export const ProtectedAdmin = () => {
	const { admin } = useAuth();

	return !!admin ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
