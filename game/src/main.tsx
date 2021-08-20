import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import '@fontsource/roboto';
import { wasmInit } from './util/wasm';

wasmInit().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
