import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { CreatePage } from "./create-page";
import { DetailPage } from "./detail-page";
import { LinksPage } from "./links-page";
import { AuthPage } from './auth-page/auth-page'

export function useAuthRoutes(isAuth) {
	return isAuth ? <AuthenticatedUserRoutes /> : <AnonymousRoutes />;

}

function AuthenticatedUserRoutes() {
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
	)
}

function AnonymousRoutes() {
	return (
		<Switch>
          <Route path="/login">
              <AuthPage/>
          </Route>
          <Redirect to="/login"/>
      </Switch>
	)
}

