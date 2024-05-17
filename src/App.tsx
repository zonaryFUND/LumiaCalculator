import React, { useState, useEffect } from 'react';
import Modal from "react-modal"
import Simple from "./pages/simple";
import Navigation from 'components/pages/navigation/navigation';
import { Route, Routes } from 'react-router';
import { IntlProvider } from 'react-intl';
import { locales } from './intl';

interface AppProps {}


function App({}: AppProps) {
    React.useLayoutEffect(() => {
        Modal.setAppElement("#root");
    });

    return (
        <IntlProvider locale={"ja"} messages={locales["ja"]} >
            <Navigation />
            <Routes>
                <Route path="/" element={<Simple />} />
                <Route path="/simple" element={<Simple />} />
                <Route path="/combat" element={<Simple />} />
            </Routes>
        </IntlProvider>
    );
}

export default App;
