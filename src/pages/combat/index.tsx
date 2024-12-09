import * as React from "react";
import Modal from "react-modal";
import common from "@app/common.module.styl";

import { Gear } from "@phosphor-icons/react";

import CollapseTab from "components/common/collapse-tab";
import Subject from "./subject";
import Damage from "./damage";
import style from "./index.module.styl";
import { SubjectSideContext } from "@app/ingame-params/subjects/subject-side";

import TooltipPresenter from "components/tooltip";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";
import { CombatCurrentLeftConfigKey, CombatCurrentRightConfigKey, CombatMasterySyncKey } from "@app/storage/combat";
import { useToggle } from "react-use";
import { useSubjectConfig } from "components/config/use-subject-config";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import Content from "components/pages/base/content";
import { NavigationButtonContext } from "components/pages/navigation";

const index: React.FC = props => {
    const navigation = React.useContext(NavigationButtonContext);
    React.useEffect(() => {
        navigation?.[1]({
            title: "対戦",
            right: (
                <button className={style.navbutton}>
                    <Gear fontSize={28} weight="fill" onClick={toggleShowingPreference}  />
                </button>
            )
        })
    }, [])

    const {value: damageInFormula, setValue: setDamageInFormula} = useStorageBoolean(DetailedTooltipKey);
    const {value: makeMasteryAlign, setValue: setMakeMasteryAlign} = useStorageBoolean(CombatMasterySyncKey);

    const left = useSubjectConfig(CombatCurrentLeftConfigKey);
    const leftStatus = useStatus(left.value);
    const leftHP = React.useState(leftStatus.maxHP.calculatedValue.toNumber());
    React.useEffect(() => {
        if (leftStatus.maxHP.calculatedValue.lessThan(leftHP[0])) {
            leftHP[1](leftStatus.maxHP.calculatedValue.toNumber())
        }
    }, [leftStatus.maxHP])

    const right = useSubjectConfig(CombatCurrentRightConfigKey);
    const rightStatus = useStatus(right.value);
    const rightHP = React.useState(rightStatus.maxHP.calculatedValue.toNumber())
    React.useEffect(() => {
        if (rightStatus.maxHP.calculatedValue.lessThan(rightHP[0])) {
            rightHP[1](rightStatus.maxHP.calculatedValue.toNumber())
        }
    }, [rightStatus.maxHP])

    React.useEffect(() => {
        if (!makeMasteryAlign) return;
        right.setConfig({
            ...right.value,
            level: left.level[0],
            weaponMastery: left.weaponMastery[0],
            defenseMastery: left.defenseMastery[0],
            movementMastery: left.movementMastery[0]
        });
    }, [
        makeMasteryAlign,
        left.level[0], 
        left.weaponMastery[0], 
        left.defenseMastery[0], 
        left.movementMastery[0]
    ]);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
        <Content
            pcHeader={
                <header className={style.header}>
                    <div className={style.config}>
                        <Gear fontSize={44} weight="fill" onClick={toggleShowingPreference}  />
                    </div>
                </header>
            }
        >
            <CollapseTab tabs={["左実験体", "ダメージ", "右実験体"]}>
                <SubjectSideContext.Provider value="left">
                    <Subject
                        {...left}
                        status={leftStatus}
                    />
                </SubjectSideContext.Provider>
                <Damage 
                    leftStatus={leftStatus} 
                    rightStatus={rightStatus} 
                    leftConfig={left.value} 
                    rightConfig={right.value} 
                    leftHP={leftHP[0]} 
                    rightHP={rightHP[0]} 
                />
                <SubjectSideContext.Provider value="right">
                    <Subject
                        {...right}
                        status={rightStatus}
                    />
                </SubjectSideContext.Provider>
            </CollapseTab>
            <TooltipPresenter 
                showEquation={damageInFormula}
                config={[left.value, right.value]}
                status={[leftStatus, rightStatus]}
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
                    makeMasteryAlign={[makeMasteryAlign, setMakeMasteryAlign]} 
                />
            </Modal>
        </Content>
    )
};

export default index;