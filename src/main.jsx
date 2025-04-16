import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root using createRoot

root.render(
  <BrowserRouter> {/* Wrap the entire app in BrowserRouter */}
    <App />
  </BrowserRouter>
);
