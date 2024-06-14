import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import Log from './components/Entries';
import Accounts from './components/Accounts';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.webp';
import useEntryModal from './hooks/useEntryModal';
import useAccountModal from './hooks/useAccountModal';
import EntryModal from './components/modals/EntryModal';
import AccountModal from './components/modals/AccountModal';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [key, setKey] = useState('entries');

  const {
    isEntryModalOpen,
    entryData,
    handleNew: handleNewEntry,
    handleEdit: handleEditEntry,
    handleClose: handleCloseEntry,
    handleChange: handleChangeEntry,
    handleSave: handleSaveEntry
  } = useEntryModal(setEntries);

  const {
    isAccountModalOpen,
    accountData,
    handleNew: handleNewAccount,
    handleEdit: handleEditAccount,
    handleClose: handleCloseAccount,
    handleChange: handleChangeAccount,
    handleSave: handleSaveAccount
  } = useAccountModal(setAccounts);

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
              <Button variant="primary" onClick={handleNewEntry} className="new-entry-button">
                New Entry
              </Button>
              <Log entries={entries} setEntries={setEntries} handleEdit={handleEditEntry} />
            </div>
          </Tab>
          <Tab eventKey="accounts" title="Accounts">
            <div className="tab-content-wrapper">
              <Button variant="primary" onClick={handleNewAccount} className="new-account-button">
                New Account
              </Button>
              <Accounts accounts={accounts} setAccounts={setAccounts} handleEdit={handleEditAccount} />
            </div>
          </Tab>
        </Tabs>
      </div>
      <EntryModal
        isOpen={isEntryModalOpen}
        onClose={handleCloseEntry}
        entryData={entryData}
        handleChange={handleChangeEntry}
        handleSave={handleSaveEntry}
      />
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={handleCloseAccount}
        accountData={accountData}
        handleChange={handleChangeAccount}
        handleSave={handleSaveAccount}
      />
    </div>
  );
};

export default App;
