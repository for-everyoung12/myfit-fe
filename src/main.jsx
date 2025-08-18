// src/main.jsx
import React from 'react';
import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

import { initGA } from './lib/analytics/ga';
import GAProvider from './GAProvider';

initGA(import.meta.env.VITE_GA4_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GAProvider>
          <App />
        </GAProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
