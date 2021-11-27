import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticatedUserRoutes } from './routes/authenticated-routes';
import { AnonymousRoutes } from './routes/anonymous-routes';

export function App() {
	const isAuth = false;

	return (
		<BrowserRouter>
			{ isAuth ? <AuthenticatedUserRoutes /> : <AnonymousRoutes /> }
		</BrowserRouter>
	)
}
