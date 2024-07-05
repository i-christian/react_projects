import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import createAuthRequiredPage from "./auth/pages/createAuthRequiredPage"

import { MainPage } from '../../../../src/MainPage'
import { SignupPage } from '../../../../src/SignupPage'
import { LoginPage } from '../../../../src/LoginPage'


import { routes } from 'wasp/client/router'

export const routeNameToRouteComponent = {
  RootRoute: createAuthRequiredPage(MainPage),
  SignupRoute: SignupPage,
  LoginRoute: LoginPage,
} as const;

const router = (
  <Router basename="/">
    <Switch>
      {Object.entries(routes).map(([routeKey, route]) => (
        <Route
          exact
          key={routeKey}
          path={route.to}
          component={routeNameToRouteComponent[routeKey]}
        />
      ))}
    </Switch>
  </Router>
)

export default router
