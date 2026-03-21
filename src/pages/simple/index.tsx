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
import CollapseTab from "components/common/collapse-tab";
import { SimpleCurrentConfigKey } from "@app/storage/simple";
import { styles } from "@app/util/style";
import { PresetWithKey, usePresetStorage as usePresetStorage } from "@app/storage/preset";
import { WeaponTypeID } from "app-types/equipment/weapon";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";
import { NavigationButtonContext } from "components/pages/navigation";

import Content from "components/pages/base/content";
import { useSubjectConfigState } from "components/config/use-subject-config";
import { statusOf } from "app-types/subject-dynamic/status/calculation";
import { SimpleModeSubjectConfigProvider } from "@app/features/subject-config/store";

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

    /*
    const configProps = useSubjectConfigState(SimpleCurrentConfigKey);
    const hpRatio = React.useState(100);
    const status = statusOf(configProps.value, hpRatio[0]);
    */

    const {value: damageInFormula, setValue: setDamageInFormula} = useStorageBoolean(DetailedTooltipKey);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
        <SimpleModeSubjectConfigProvider>
        <Content
            pcHeader={
                <header className={style.header}>
                    <div className={style.config}>
                        <Gear fontSize={44} weight="fill" onClick={toggleShowingPreference}  />
                    </div>
                </header>
            }
        >
            <CollapseTab tabs={["実験体", "ダメージ", "バフ・デバフ"]}>
                <Subject />
                <Damage />
                <BuffDebuffs />
            </CollapseTab>
            {/*
            <TooltipPresenter 
                showEquation={damageInFormula}
                status={status} 
                config={configProps.value} 
            />
            */}
            <Modal
                isOpen={showingPreference}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingPreference}
                className={preferenceStyle.preference}
                overlayClassName={common["modal-overlay"]}
            >
                <Preference damageInFormula={[damageInFormula, setDamageInFormula]} />
            </Modal>
        </Content>
        </SimpleModeSubjectConfigProvider>
    )
};

export default index;