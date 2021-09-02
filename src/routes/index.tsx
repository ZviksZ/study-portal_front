import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'containers/Auth';

export default function useRoutes() {
  return (
    <div className="tw-h-screen tw-flex tw-flex-col tw-flex-1">
      <Switch>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
}
