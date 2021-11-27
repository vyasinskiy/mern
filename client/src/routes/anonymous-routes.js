import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from '../pages/auth-page/auth-page'

export function AnonymousRoutes() {
	return (
		<Switch>
          <Route path="/login">
              <AuthPage/>
          </Route>
          <Redirect to="/login"/>
      </Switch>
	);
}

