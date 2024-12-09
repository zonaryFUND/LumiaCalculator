import React, { useState, useEffect, useRef } from 'react';
import Base from "components/pages/base";
import Modal from "react-modal"
import Simple from "./pages/simple";
import Combat from "./pages/combat";
import Navigation, { NavigationButtonContext, useNavigationButtonState } from 'components/pages/navigation';
import { Route, Routes } from 'react-router';
import { IntlProvider } from 'react-intl';
import { OpenModalItemProps, TooltipContext, useOpenModalItemRef, useOpenModalSkillRef } from 'components/tooltip/tooltip-context';
import { TooltipRefProps } from 'react-tooltip';

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

    const navigation = useNavigationButtonState();

    const skillTooltipRef = useOpenModalSkillRef();
    const itemTooltipRef = useOpenModalItemRef();

    return (
        <IntlProvider locale={"ja"} messages={Locales["ja"]} onError={error => {
            
        }} >
            <NavigationButtonContext.Provider value={navigation}>
            <TooltipContext.Provider value={{openModalSkill: skillTooltipRef, openModalItem: itemTooltipRef}}>
                <Navigation />
                <Base>
                    <Routes>
                        <Route path="/" element={<Simple />} />
                        <Route path="/simple" element={<Simple />} />
                        <Route path="/combat" element={<Combat />} />
                    </Routes>
                </Base>
            </TooltipContext.Provider>
            </NavigationButtonContext.Provider>
        </IntlProvider>
    );
}

export default App;
