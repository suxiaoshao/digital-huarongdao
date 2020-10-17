import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Game from './view/game';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Record from './view/record';
import Tip from './view/tip';

export default function App(): JSX.Element {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/game" exact>
            <Game />
          </Route>
          <Route path="/record" exact>
            <Record />
          </Route>
          <Route path="/tip" exact>
            <Tip />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
