import { NextUIProvider } from "@nextui-org/react";
import { lazy } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const HomePage = lazy(() => import("@/pages/Homepage"));
const Analytics = lazy(() => import("@/pages/DashBoard/Analytics"));
const Loginpage = lazy(() => import("@/pages/LoginPage"));
const Signuppage = lazy(() => import("@/pages/SignUpPage"));
const Profile = lazy(() => import("@/pages/Dashboard/ProfilePage"));
const PermissionPage = lazy(() =>  import("@/pages/Dashboard/Permission"));
const OrganizationService = lazy(() => import("@/pages/Dashboard/Organize"));
const Recognition = lazy(() => import("@/pages/Recognition"));
const CreateTeam = lazy(() => import("@/pages/CreateTeam"));
const OrganizationInfo = lazy(() => import("@/pages/Dashboard/OrganizeInfo"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, },
  { path: "dashboard", element: <Analytics />, },
  { path: "login", element: <Loginpage />, },
  { path: "signup", element: < Signuppage />, },
  { path: "profile", element: < Profile />, },
  { path: "organize", element: < OrganizationService />, },
  { path: "new", element: < CreateTeam />, },
  { path: "recognition", element: < Recognition />, },
])
export const App = () => {
  return (
    <NextUIProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </NextUIProvider>
  );
};
