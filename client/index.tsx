import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App';
import './style.css';


ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
