import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useRoutes} from './pages/routes';

export function App() {
  const routes = useRoutes(false);

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}
