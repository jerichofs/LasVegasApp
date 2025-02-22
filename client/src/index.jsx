import React from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App/App';
import { AppProvider } from 'contexts/AppContext/AppContext';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
