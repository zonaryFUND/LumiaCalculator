import * as React from "react";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import common from "@app/common.styl";

import { Gear } from "@phosphor-icons/react";

import CollapseTab from "components/common/collapse-tab";
import Subject from "./subject";
import Damage from "./damage";
import useSubjectConfig from "app-types/subject-dynamic/config/use-subject-config";
import { useLocalStorage, useToggle, useWindowSize } from "react-use";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { CombatCurrentLeftConfigKey, CombatCurrentRightConfigKey, CombatMasterySyncKey, useStorageOnCombat } from "@app/storage/combat";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import style from "./index.module.styl";
import { styles } from "@app/util/style";
import { SubjectSideContext } from "components/subjects/subject-side";

import ItemTooltip from "components/tooltip/item/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import { SubjectSkillProps } from "components/subjects/props";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";
import { useBuildStorage } from "@app/storage/build";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";

const index: React.FC = props => {
    const [collapse, setCollapse] = React.useState(false);
    const [storageConfigLeft, saveConfigLeft] = useLocalStorage<SubjectConfig>(CombatCurrentLeftConfigKey);
    const leftConfig = useSubjectConfig({value: storageConfigLeft, update: saveConfigLeft});
    const leftStatus = useStatus(leftConfig.value);
    const [leftHP, setLeftHP] = React.useState(0);

    const [storageConfigRight, saveConfigRight] = useLocalStorage<SubjectConfig>(CombatCurrentRightConfigKey);
    const rightConfig = useSubjectConfig({value: storageConfigRight, update: saveConfigRight});
    const rightStatus = useStatus(rightConfig.value);
    const [rightHP, setRightHP] = React.useState(0);

    const damageInFormula = useStorageBoolean(DetailedTooltipKey);
    const makeMasteryAlign = useStorageBoolean(CombatMasterySyncKey);
    const ltr = React.useState(true);

    const { builds, saveNew } = useBuildStorage();
    const { left: leftStorage, right: rightStorage } = useStorageOnCombat();
    const currentBuildLeft = React.useMemo(() => {
        return builds.find(b => b.key == leftStorage.currentBuildKey);
    }, [builds.length, leftStorage.currentBuildKey]);
    const currentBuildRight = React.useMemo(() => {
        return builds.find(b => b.key == rightStorage.currentBuildKey);
    }, [builds.length, rightStorage.currentBuildKey]);

    const { width } = useWindowSize();
    const parentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    React.useEffect(() => {
        if (!makeMasteryAlign[0]) return;
        rightConfig.setConfig({
            ...rightConfig.value,
            level: leftConfig.level[0],
            weaponMastery: leftConfig.weaponMastery[0],
            defenseMastery: leftConfig.defenseMastery[0],
            movementMastery: leftConfig.movementMastery[0]
        });
    }, [
        makeMasteryAlign,
        leftConfig.level, 
        leftConfig.weaponMastery, 
        leftConfig.defenseMastery, 
        leftConfig.movementMastery
    ]);

    const [loading, setLoading] = React.useState<"left" | "right" | null>(null);
    const [saving, setSaving] = React.useState<"left" | "right" | null>(null);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
        <main className={style.combat} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <header className={style.header} style={collapse ? {flexDirection: "column"} : undefined}>
                    <div />
                    {/*
                    <div className={style.storage}>
                        <h1>保存名：{currentBuildLeft?.name ?? "-----"}</h1>
                        <div>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setLoading("left")}>ロード</button>
                            {currentBuildLeft?.isPreset || currentBuildLeft == undefined ? null : <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setSaving("left")}>上書き保存</button>}
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setSaving("left")}>新規保存</button>
                        </div>
                    </div>
                    */}
                    <div className={style.config}>
                        <Gear fontSize={44} weight="fill" onClick={toggleShowingPreference}  />
                    </div>
                </header>
                <CollapseTab collapse={collapse}>
                    <SubjectSideContext.Provider value="left">
                        <Subject
                            {...leftConfig}
                            status={leftStatus}
                            config={leftConfig.value}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                    <Damage leftStatus={leftStatus} rightStatus={rightStatus} leftConfig={leftConfig.value} rightConfig={rightConfig.value} leftHP={leftHP} rightHP={rightHP} />
                    <SubjectSideContext.Provider value="right">
                        <Subject
                            {...rightConfig}
                            status={rightStatus}
                            config={rightConfig.value}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                </CollapseTab>
            </div>
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const [subject, skill] = content?.split("-");
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');

                    return (
                        <SubjectSkillTooltip
                            id={subject} 
                            skill={skill as any} 
                            showEquation={damageInFormula[0]}
                            status={side == "left" ? leftStatus : rightStatus} 
                            config={side == "left" ? leftConfig.value : rightConfig.value} 
                        />
                    );
                }}
            />
            <Tooltip 
                id="weapon-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');
                    return (
                        <WeaponSkillTooltip 
                            showEquation={damageInFormula[0]}
                            status={side == "left" ? leftStatus : rightStatus} 
                            config={side == "left" ? leftConfig.value : rightConfig.value} 
                        />
                    );
                }}
            />
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;

                    const [item, onSlot] = content.split("%");
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');

                    const props: SubjectSkillProps = {
                        showEquation: damageInFormula[0] || onSlot == undefined,
                        config: side == "left" ? leftConfig.value : rightConfig.value,
                        status: side == "left" ? leftStatus : rightStatus
                    };

                    return <ItemTooltip itemID={item} {...props} />;
                }}
            />
            <Modal
                isOpen={showingPreference}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingPreference}
                className={preferenceStyle.preference}
                overlayClassName={common["modal-overlay"]}
            >
                <Preference 
                    damageInFormula={damageInFormula} 
                    makeMasteryAlign={makeMasteryAlign} 
                />
            </Modal>
        </main>
    )
};

export default index;