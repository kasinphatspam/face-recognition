import { NextUIProvider } from "@nextui-org/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedUser, ProtectedOrganization } from "@/hooks/ProtectRoute";
import { FallBackPage } from "@/pages/Critical/LoadingPage";
import { AnimatePresence } from "framer-motion";

const HomePage = lazy(() => import("@/pages/HomePage"));
const Analytics = lazy(() => import("@/pages/Dashboard/Analytics"));
const Loginpage = lazy(() => import("@/pages/LoginPage"));
const Signuppage = lazy(() => import("@/pages/SignUpPage"));
const Settings = lazy(() => import("@/pages/Dashboard/Settings"));
const OrganizationService = lazy(() => import("@/pages/Dashboard/Organize"));
const Recognition = lazy(() => import("@/pages/Recognition"));
const CreateTeam = lazy(() => import("@/pages/CreateTeam"));
const OrganizationInfo = lazy(() => import("@/pages/Dashboard/OrganizeInfo"));
const Contact = lazy(() => import("@/pages/Dashboard/Contact"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const Featurepage = lazy(() => import("@/pages/FeaturePage"));

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "login", element: <Loginpage /> },
  { path: "signup", element: <Signuppage /> },
  { path: "contactus", element: <ContactUs /> },
  { path: "subscription", element: <Subscription /> },
  { path: "featurepage", element: <Featurepage /> },
  {
    element: <ProtectedUser />,
    children: [
      { path: "new", element: <CreateTeam /> },
      {
        element: <ProtectedOrganization />,
        children: [
          { path: "dashboard", element: <Analytics /> },
          { path: "organize", element: <OrganizationService /> },
          { path: "recognition", element: <Recognition /> },
          { path: "setting", element: <Settings /> },
          { path: "organize/:id", element: <OrganizationInfo /> },
          { path: "contact", element: <Contact /> },
        ],
      },
    ],
  },
]);

export const App = () => {
  return (
    <NextUIProvider>
      <ThemeProvider>
        <AuthProvider>
          <AnimatePresence mode="wait">
          <Suspense fallback={<FallBackPage />}>
            <RouterProvider router={router} />
          </Suspense>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
