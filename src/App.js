import React, { useState } from 'react';
import axios from 'axios';
import Login from './components/Login'; // Adjust import path based on your project structure
import './App.css'; // Optional: CSS file for styling

const App = () => {
  // Initialize authToken state

  return (
    <div className="app-container">
      <Login  />
      {/* You can render other components or routes here */}
    </div>
  );
};

export default App;
