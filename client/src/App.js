import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthRoutes } from './pages/use-auth-routes';

export function App() {
  const isAuth = false;
  const authRoutes = useAuthRoutes(isAuth);

  return (
    <BrowserRouter>
      {authRoutes}
    </BrowserRouter>
  )
  
}
