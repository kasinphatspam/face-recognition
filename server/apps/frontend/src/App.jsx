import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Analytics from '@/pages/Analytics';
import Loginpage from './pages/LoginPage';
import Signuppage from '@/pages/SignUpPage';
import Profile from '@/pages/ProfilePage';

export const App = () => {
  
  return (
    <NextUIProvider>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<Signuppage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}
