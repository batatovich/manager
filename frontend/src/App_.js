import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={ <Dashboard />}>
      </Route>
    </Routes>
  );
};

export default App;
