import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Game from './view/game';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}
