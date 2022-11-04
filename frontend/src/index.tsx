import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
=======
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import store from './app/store';
>>>>>>> landingPage

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
<<<<<<< HEAD
  //Wrapping app in order to actually
  //use routes

  <BrowserRouter>
    <App />
  </BrowserRouter>
=======
  <Provider store={store}>
    <App />
  </Provider>
>>>>>>> landingPage
);
