import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { AuthProvider } from './context/AuthContext';
import Chatbox from './components/Chatbox';

const OKTA_CONFIG = {
  clientId: 'your-client-id',
  issuer: 'https://your-okta-domain.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
};

const App = () => {
  return (
    <AuthProvider>
      <Security {...OKTA_CONFIG}>
        <Router>
          <Routes>
            <Route path="/" element={<Chatbox />} />
            <Route path="/login/callback" element={<LoginCallback />} />
          </Routes>
        </Router>
      </Security>
    </AuthProvider>
  );
};

export default App;
