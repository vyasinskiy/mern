import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { CreatePage } from "./CreatePage";
import { DetailPage } from "./DetailPage";
import { LinksPage } from "./LinksPage";
import { AuthPage } from './AuthPage'


export function useRoutes(isAuth) {
    if (isAuth) {
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
    } else {
        return (
            <Switch>
                <Route path="/login">
                    <AuthPage/>
                </Route>
                <Redirect to="/login"/>
            </Switch>
        )
    }
}