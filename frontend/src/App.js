import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Log from './components/Entries';
import Accounts from './components/Accounts';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccountModalProvider } from './contexts/AccountModalContext';
import { EntryModalProvider } from './contexts/EntryModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  const [key, setKey] = useState('entries');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app-header">
          <h2 className="app-title">Budget Buddy</h2>
        </header>
        <div className="tabs-container">
          <Tabs
            id="budget-buddy-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="tabs"
          >
            <Tab eventKey="entries" title="Log Book">
              <EntryModalProvider>
                <div className="tab-content-wrapper">
                  <Log />
                </div>
              </EntryModalProvider>
            </Tab>
            <Tab eventKey="accounts" title="Accounts">
              <AccountModalProvider>
                <div className="tab-content-wrapper">
                  <Accounts />
                </div>
              </AccountModalProvider>
            </Tab>
          </Tabs>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
