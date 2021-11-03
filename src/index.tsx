import "reflect-metadata"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Provider as Container }from 'inversify-react';
import container from './core/di';
import store from "./view/state/store";


ReactDOM.render(
  <React.StrictMode>
      <Container container={container}>
        <Provider store = {store}>
          <App />
        </Provider>
      </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(() => {});