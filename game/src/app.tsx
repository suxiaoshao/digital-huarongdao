import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getSwaps } from './util';
import Home from './view/home';
import Game from './view/game';

export default function App(): JSX.Element {
  useEffect(() => {
    const time = new Date().getTime();
    const data = getSwaps([2, 5, 6, 1, 0, 3, 4, 8, 9]);
    console.log(data);
    console.log(new Date().getTime() - time);
  }, []);
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
