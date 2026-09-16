import React, { useState, useEffect, useRef } from 'react';
import Base from "components/layout/base";
import Modal from "react-modal"
import Simple from "./pages/simple";
import Combat from "./pages/combat";
import DevTooltipsIndex from "./pages/dev-tooltips";
import DevTooltipsSubjects from "./pages/dev-tooltips/subjects";
import DevTooltipsWeaponSkills from "./pages/dev-tooltips/weapon-skills";
import DevTooltipsItems from "./pages/dev-tooltips/items";
import Navigation, { NavigationButtonContext, useNavigationButtonState } from 'components/layout/navigation';
import { Route, Routes } from 'react-router';
import { IntlProvider } from 'react-intl';
import { TooltipContext, useOpenModalItemRef, useOpenModalSkillRef } from 'components/tooltip/tooltip-context';

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
                        {/* 開発用ツール2（ツールチップ目視検査ページ）。ナビゲーションメニューには
                            未リンクで、URLを直接開いてアクセスする想定（docs/README等の参照は必要に応じて） */}
                        <Route path="/dev/tooltips" element={<DevTooltipsIndex />} />
                        <Route path="/dev/tooltips/subjects" element={<DevTooltipsSubjects />} />
                        <Route path="/dev/tooltips/weapon-skills" element={<DevTooltipsWeaponSkills />} />
                        <Route path="/dev/tooltips/items" element={<DevTooltipsItems />} />
                    </Routes>
                </Base>
            </TooltipContext.Provider>
            </NavigationButtonContext.Provider>
        </IntlProvider>
    );
}

export default App;
