import { NextUIProvider } from "@nextui-org/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const HomePage = lazy(() => import("@/pages/Homepage.jsx"));
const Analytics = lazy(() => import("@/pages/DashBoard/Analytics.jsx"));
const Loginpage = lazy(() => import("@/pages/LoginPage.jsx"));
const Signuppage = lazy(() => import("@/pages/SignUpPage.jsx"));
const Profile = lazy(() => import("@/pages/Dashboard/ProfilePage.jsx"));
const PermissionPage = lazy(() =>  import("@/pages/Dashboard/Permission.jsx"));
const OrganizationService = lazy(() => import("@/pages/Dashboard/Organize.jsx"));
const Recognition = lazy(() => import("@/pages/Recognition.jsx"));
const CreateTeam = lazy(() => import("@/pages/CreateTeam.jsx"));
const OrganizationInfo = lazy(() => import("@/pages/Dashboard/OrganizeInfo.jsx"));

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
        <Suspense fallback={
        <>
          <div className="-z-10 bg-zinc-700 w-screen h-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
              <p className="text-white/90 font-medium">Loading data</p>
              <img src="/loading.svg" className="w-16 h-16 ml-7" />
            </div> 
          </div>
        </>
        }>
          <RouterProvider router={router}/>
        </Suspense>
      </AuthProvider>
    </NextUIProvider>
  );
};
