import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          111
        </Route>
        <Route path="/game">222</Route>
      </Switch>
    </Router>
  );
}
