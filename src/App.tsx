import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppNavigator } from './navigation/AppNavigator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <AppNavigator />
      </div>
    </Router>
  );
}

export default App;

