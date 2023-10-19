import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Analytics from "@/pages/Dashboard/Analytics";
import Loginpage from "@/pages/LoginPage";
import Signuppage from "@/pages/SignUpPage";
import Profile from "@/pages/Dashboard/ProfilePage";
import PermissionPage from "@/pages/Dashboard/Permission";
import OrganizationService from "@/pages/Dashboard/Organize";
import Recognition from "@/pages/Recognition";
import OrganizationInfo from "@/pages/Dashboard/OrganizeInfo";

export const App = () => {
  return (
    <NextUIProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Analytics />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/permission" element={<PermissionPage />} />
          <Route path="/organize" element={<OrganizationService />} />
          <Route path="/organize/:id" element={<OrganizationInfo />} />
          <Route path="/recognition" element={<Recognition />} />
        </Routes>
      </BrowserRouter>  
    </NextUIProvider>
  );
};
