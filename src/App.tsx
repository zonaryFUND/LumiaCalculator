import React, { useState, useEffect } from 'react';
import Modal from "react-modal"
import Simple from "./pages/simple";
import Navigation from 'components/pages/navigation/navigation';
import { Route, Routes } from 'react-router';
import { IntlProvider } from 'react-intl';

const context = require.context("./intl/locales/", true, /\.\/.*\/.*\.json$/);
export const Locales = context.keys().reduce((locales, path) => {
    const key = path.split("/")[1];
    locales[key] = {
        ...locales[key],
        ...context(path)
    };
    return locales;
}, {} as {[locale: string]: Record<string, string>})
console.log(Locales)

interface AppProps {}


function App({}: AppProps) {
    React.useLayoutEffect(() => {
        Modal.setAppElement("#root");
    });

    return (
        <IntlProvider locale={"ja"} messages={Locales["ja"]} onError={error => {
            
        }} >
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
