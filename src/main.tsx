// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { setupApiClient } from './redux/apiSetup';

// Initialize ApiClient with Redux handlers
setupApiClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
