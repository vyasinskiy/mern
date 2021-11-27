import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { CreatePage } from "../pages/create-page";
import { DetailPage } from "../pages/detail-page";
import { LinksPage } from "../pages/links-page";

export function AuthenticatedUserRoutes() {
	return (
		<Switch>
			<Route path="/links" exact>
				<LinksPage/>
			</Route>
			<Route path="/create" exact>
				<CreatePage/>
			</Route>
			<Route path="/detail/:id">
				<DetailPage/>
			</Route>
			<Redirect to="/create"/>
		</Switch>
	);
}
