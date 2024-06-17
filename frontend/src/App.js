import React, { useState } from 'react';
import { Tabs, Tab} from 'react-bootstrap';
import Log from './components/Entries';
import Accounts from './components/Accounts';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.webp';

const App = () => {
  const [key, setKey] = useState('entries');

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" width={100} height={100} />
        <h1 className="app-title">Budget Buddy</h1>
      </header>
      <div className="tabs-container">
        <Tabs
          id="budget-buddy-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="tabs"
        >
          <Tab eventKey="entries" title="Log Book">
            <div className="tab-content-wrapper">
              <Log />
            </div>
          </Tab>
          <Tab eventKey="accounts" title="Accounts">
            <div className="tab-content-wrapper">
              <Accounts />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
