import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'

import { BrowserRouter } from 'react-router-dom';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme} >
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
    
      
  </React.StrictMode>
);

