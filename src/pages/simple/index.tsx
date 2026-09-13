import * as React from "react";
import Modal from "react-modal";
import common from "@app/common.module.styl";

import { Gear } from "@phosphor-icons/react"

import style from "./index.module.styl";

import Subject from "../simple/subject";
import BuffDebuffs from "./buff-debuffs";
import Damage from "./damage";
import TooltipPresenter from "components/tooltip";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";

import { useToggle } from "react-use";
import { useStore } from "zustand";
import CollapsiblePanes from "components/layout/pane/collapsible-panes";
import { SimpleCurrentConfigKey } from "@app/storage/simple";
import { styles } from "@app/util/style";
import { PresetWithKey, usePresetStorage as usePresetStorage } from "@app/storage/preset";
import { WeaponTypeID } from "core/equipment/weapon";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey, HideZeroStatusKey } from "@app/storage/common";
import { NavigationButtonContext } from "components/layout/navigation";
import { HideZeroValueContext } from "components/common/table-row";

import Content from "components/layout/base/content";
import { createSubjectConfigStore, SubjectConfigStoreProvider } from "@app/features/subject-config/store";

const index: React.FC = props => {
    const navigation = React.useContext(NavigationButtonContext);
    React.useEffect(() => {
        navigation?.[1]({
            title: "シンプル",
            right: (
                <button className={style.navbutton}>
                    <p>Config</p>
                    <Gear fontSize={28} weight="fill" onClick={toggleShowingPreference}  />
                </button>
            )
        })
    }, [])

    // TooltipPresenterが実際のconfig/statusを参照できるよう、storeはこのページ側で生成する
    // （対戦モードのpages/combat/index.tsxと同じパターン）
    const store = React.useRef(createSubjectConfigStore(SimpleCurrentConfigKey)).current;
    const config = useStore(store, s => s.config);
    const status = useStore(store, s => s.status);

    const {value: damageInFormula, setValue: setDamageInFormula} = useStorageBoolean(DetailedTooltipKey);
    const {value: hideZeroStatus, setValue: setHideZeroStatus} = useStorageBoolean(HideZeroStatusKey);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
        <SubjectConfigStoreProvider store={store}>
        <Content
            pcHeader={
                <header className={style.header}>
                    <button className={style.config} onClick={toggleShowingPreference}>
                        <Gear fontSize={20} weight="fill" />
                        <p>設定</p>
                    </button>
                </header>
            }
        >
            <HideZeroValueContext.Provider value={hideZeroStatus}>
            <CollapsiblePanes tabs={["実験体", "ダメージ", "バフ・デバフ"]}>
                <Subject />
                <Damage />
                <BuffDebuffs />
            </CollapsiblePanes>
            </HideZeroValueContext.Provider>
            <TooltipPresenter
                showEquation={damageInFormula}
                subject={{config, status}}
            />
            <Modal
                isOpen={showingPreference}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingPreference}
                className={preferenceStyle.preference}
                overlayClassName={common["modal-overlay"]}
            >
                <Preference
                    damageInFormula={[damageInFormula, setDamageInFormula]}
                    hideZeroStatus={[hideZeroStatus, setHideZeroStatus]}
                />
            </Modal>
        </Content>
        </SubjectConfigStoreProvider>
    )
};

export default index;
