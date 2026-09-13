import * as React from "react";
import Modal from "react-modal";
import common from "@app/common.module.styl";

import { Gear } from "@phosphor-icons/react";

import CollapsiblePanes from "components/layout/pane/collapsible-panes";
import Subject from "./subject";
import Damage from "./damage";
import style from "./index.module.styl";

import TooltipPresenter from "components/tooltip";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";
import { CombatCurrentLeftConfigKey, CombatCurrentRightConfigKey, CombatMasterySyncKey } from "@app/storage/combat";
import { useToggle } from "react-use";
import { useStore } from "zustand";
import Content from "components/layout/base/content";
import { NavigationButtonContext } from "components/layout/navigation";
import { createSubjectConfigStore, SubjectConfigStoreProvider } from "@app/features/subject-config/store";
import { TooltipSubjectSideContext } from "components/tooltip/subject-side-context";

const index: React.FC = props => {
    const navigation = React.useContext(NavigationButtonContext);
    React.useEffect(() => {
        navigation?.[1]({
            title: "対戦",
            right: (
                <button className={style.navbutton}>
                    <p>Config</p>
                    <Gear fontSize={28} weight="fill" onClick={toggleShowingPreference}  />
                </button>
            )
        })
    }, [])

    const {value: damageInFormula, setValue: setDamageInFormula} = useStorageBoolean(DetailedTooltipKey);
    const {value: makeMasteryAlign, setValue: setMakeMasteryAlign} = useStorageBoolean(CombatMasterySyncKey);

    // 中央のダメージ計算結果カラムが左右両方のconfig/statusを同時に参照できるよう、
    // storeはこのページ側で生成する。<Subject>にはSubjectConfigStoreProvider経由で
    // 同じインスタンスを渡し、このページ自身もuseStoreで直接値を読む
    const leftStore = React.useRef(createSubjectConfigStore(CombatCurrentLeftConfigKey)).current;
    const rightStore = React.useRef(createSubjectConfigStore(CombatCurrentRightConfigKey)).current;

    const leftConfig = useStore(leftStore, s => s.config);
    const leftStatus = useStore(leftStore, s => s.status);
    const leftHpRatio = useStore(leftStore, s => s.hpRatio);
    const leftHP = leftStatus.maxHp.calculatedValue.percent(leftHpRatio).floor().toNumber();

    const rightConfig = useStore(rightStore, s => s.config);
    const rightStatus = useStore(rightStore, s => s.status);
    const rightHpRatio = useStore(rightStore, s => s.hpRatio);
    const rightHP = rightStatus.maxHp.calculatedValue.percent(rightHpRatio).floor().toNumber();

    React.useEffect(() => {
        if (!makeMasteryAlign) return;
        rightStore.getState().setConfig({
            ...rightStore.getState().config,
            level: leftConfig.level,
            weaponMastery: leftConfig.weaponMastery,
            defenseMastery: leftConfig.defenseMastery,
            movementMastery: leftConfig.movementMastery
        });
    }, [
        makeMasteryAlign,
        leftConfig.level,
        leftConfig.weaponMastery,
        leftConfig.defenseMastery,
        leftConfig.movementMastery
    ]);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
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
            <CollapsiblePanes tabs={["左実験体", "ダメージ", "右実験体"]}>
                <TooltipSubjectSideContext.Provider value="left">
                    <SubjectConfigStoreProvider store={leftStore}>
                        <Subject
                            side="left"
                        />
                    </SubjectConfigStoreProvider>
                </TooltipSubjectSideContext.Provider>
                <Damage
                    left={{config: leftConfig, status: leftStatus, hp: leftHP}}
                    right={{config: rightConfig, status: rightStatus, hp: rightHP}}
                />
                <TooltipSubjectSideContext.Provider value="right">
                    <SubjectConfigStoreProvider store={rightStore}>
                        <Subject
                            side="right"
                        />
                    </SubjectConfigStoreProvider>
                </TooltipSubjectSideContext.Provider>
            </CollapsiblePanes>
            <TooltipPresenter
                showEquation={damageInFormula}
                subject={[
                    {config: leftConfig, status: leftStatus},
                    {config: rightConfig, status: rightStatus}
                ]}
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
