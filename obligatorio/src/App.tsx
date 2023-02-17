import React from 'react';
import Login from './components/login/loginComponents';
import Dashboard from './components/dashboard/dashboardComponent';
import loginBL from './businessLogic/sessionBL';
import sessionBL from './businessLogic/sessionBL';
import Nav from './components/header/navComponent';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <section>
      {
        sessionBL.isLogged() ? <Dashboard/> : <Login/>
      }
      </section>
    </Provider>
  );
}

export default App;