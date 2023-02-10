import React from 'react';
import Login from './components/login/loginComponents';
import Dashboard from './components/dashboard/dashboardComponent';
import loginBL from './businessLogic/sessionBL';
import sessionBL from './businessLogic/sessionBL';
import Nav from './components/header/navComponent';
import './App.scss';

function App() {
  return (
    <>
      <header>
        {
          sessionBL.isLogged() ? <Nav/> : null
        }
      </header>
      <section>
      {
        //sessionBL.isLogged() ? <Dashboard/> : <Login/>
        <Dashboard/>
      }
      </section>
    </>
  );
}

export default App;