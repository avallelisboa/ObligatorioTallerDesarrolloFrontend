import React, {useState, useEffect} from 'react';
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
  const [isLoggedState, setIsLoggedState] = useState(false);

  useEffect(()=>{
    setIsLoggedState(sessionBL.isLogged());
  },[]);

  const setIsLoggedFN = (isLogged:boolean)=>{
    setIsLoggedState(isLogged);
  };

  return (
    <Provider store={store}>
      {
        isLoggedState ? <Dashboard setIsLoggedFN={setIsLoggedFN}/> : <Login setIsLoggedFN={setIsLoggedFN}/>
      }
    </Provider>
  );
}

export default App;