import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Game from './view/game';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

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
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
