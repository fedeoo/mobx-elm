import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import FastClick from 'fastclick';
import App from './routes';
import AppState from './store/AppState';
import './config/rem';
import './style/common.scss';

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}

const appState = new AppState();

const MOUNT_NODE = document.getElementById('app');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App store={appState} />
    </AppContainer>,
    MOUNT_NODE,
  );
};
render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(); // re-require is not nesseary. See https://github.com/gaearon/react-hot-loader/tree/master/docs#starter-kits
  });
}
