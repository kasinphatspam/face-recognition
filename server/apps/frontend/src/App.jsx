import { NextUIProvider } from "@nextui-org/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedUser, ProtectedOrganization, ProtectedAdmin } from "@/hooks/ProtectRoute";
import { FallBackPage } from "@/pages/Critical/LoadingPage";
import { AnimatePresence } from "framer-motion";

const HomePage = lazy(() => import("@/pages/HomePage"));
const Loginpage = lazy(() => import("@/pages/LoginPage"));
const Signuppage = lazy(() => import("@/pages/SignUpPage"));
const Settings = lazy(() => import("@/pages/Dashboard/Settings"));
const Recognition = lazy(() => import("@/pages/Recognition"));
const CreateTeam = lazy(() => import("@/pages/CreateTeam"));
const OrganizationInfo = lazy(() => import("@/pages/Dashboard/OrganizeInfo"));
const Contact = lazy(() => import("@/pages/Dashboard/Contact"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const Featurepage = lazy(() => import("@/pages/FeaturePage"));
const Animate = lazy(() => import("@/hooks/Animate"));
const NotFoundPage = lazy(() => import("@/pages/Critical/NotFound"));
const ErrorPage = lazy(() => import("@/pages/Critical/ErrorPage"));
const ForgotPwdPage = lazy(() => import("@/pages/forgotpwd"));
const AdminPage = lazy(() => import("@/pages/dashboard/AdminPage"));

const router = createBrowserRouter([
  {
    element: <Animate />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <HomePage /> },
      { path: "login", element: <Loginpage /> },
      { path: "signup", element: <Signuppage /> },
      { path: "forgot", element: <ForgotPwdPage /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "subscription", element: <Subscription /> },
      { path: "featurepage", element: <Featurepage /> },
    ],
  },
  {
    element: <ProtectedUser />,
    errorElement: <ErrorPage />,
    children: [
      { path: "new", element: <CreateTeam /> },
      {
        element: <ProtectedOrganization />,
        children: [
          { path: "organization", element: <OrganizationInfo /> },
          { path: "recognition", element: <Recognition /> },
          { path: "setting", element: <Settings /> },
          { path: "contact", element: <Contact /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedAdmin />,
    errorElement: <ErrorPage />,
    children: [
      { path: "admin", element: <AdminPage /> },
    ]
  },
  {
    element: <NotFoundPage />,
    path: "/*"
  },
]);

export const App = () => {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<FallBackPage />}>
            <AnimatePresence mode="wait">
              <RouterProvider router={router} />
            </AnimatePresence>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
