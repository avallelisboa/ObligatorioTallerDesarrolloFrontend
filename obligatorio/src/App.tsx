import React from 'react';
import Login from './components/login/loginComponents';
import Dashboard from './components/dashboard/dashboardComponent';
import loginBL from './businessLogic/sessionBL';
import './App.scss';
import sessionBL from './businessLogic/sessionBL';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
          <article>
            {
              sessionBL.isLogged() ? <Dashboard/> : <Login/>
            }
          </article>
      </section>
    </div>
  );
}

export default App;