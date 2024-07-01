import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Log from './Entries';
import Accounts from './Accounts';
import { AccountModalProvider } from '../contexts/AccountModalContext';
import { EntryModalProvider } from '../contexts/EntryModalContext';

const Dashboard = () => {
    const [key, setKey] = useState('entries');

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2 className="dashboard-title">Manager</h2>
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
    );
};

export default Dashboard;
