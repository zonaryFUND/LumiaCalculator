import React from 'react';
import ReactDOM from 'react-dom/client';
import "./decimal.extension";
import App from './App';
import './index.styl';
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
