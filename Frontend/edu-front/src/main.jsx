import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap here. Use a real ID or this placeholder to test */}
    <GoogleOAuthProvider clientId="186701494002-nmdsltjj89p1chk7u2ubg2rn936qgubt.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);