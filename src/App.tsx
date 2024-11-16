import React, { useState, useEffect } from 'react';
import Modal from "react-modal"
import Simple from "./pages/simple";
import Combat from "./pages/combat";
import Navigation from 'components/pages/navigation/navigation';
import { Route, Routes } from 'react-router';
import { IntlProvider } from 'react-intl';

const files = import.meta.glob<Record<"default", Record<string, string>>>("./intl/locales/**/*.json", {eager: true});
export const Locales = Object.entries(files).reduce((locales, [path, m]) => {
    const key = path.split("/")[3];
    return {
        ...locales,
        [key]: {
            ...locales[key],
            ...m.default
        }
    };
}, {} as {[locale: string]: Record<string, string>})

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
                <Route path="/combat" element={<Combat />} />
            </Routes>
        </IntlProvider>
    );
}

export default App;
