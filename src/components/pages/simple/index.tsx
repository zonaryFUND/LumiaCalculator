/*
import * as React from "react";
import common from "@app/common.styl";

import style from "./index.module.styl";

import Subject from "../../../pages/simple/subject";
import BuffDebuffs from "../../../pages/simple/buff-debuffs";

import { Tooltip } from "react-tooltip";
import ItemTooltip from "components/tooltip/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import { useLocalStorage, useToggle, useWindowSize } from "react-use";
import { equipmentStatus } from "app-types/equipment";
import Switch from "components/common/switch";
import CollapseTab from "components/common/collapse-tab";
import { styles } from "@app/util/style";
import TabSelector from "../simple/tab-selector";
import { SubjectSkillProps } from "components/subjects/props";
import { useBuildStorage } from "@app/storage/build";
import Modal from "react-modal";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";
import { name } from "app-types/subject-static";
import { SimpleCurrentConfigKey, useStorageOnSimple } from "@app/storage/simple";
import useSubjectConfig from "app-types/subject-dynamic/config/use-subject-config";
import { SubjectConfig } from "app-types/subject-dynamic/config";
*/
/*
const index: React.FC = props => {
    const { width } = useWindowSize();

    const { config, saveConfig } = useLocalStorage<SubjectConfig>(SimpleCurrentConfigKey);
    const {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        defenseMastery: [defenseMastery, setDefenseMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels],
        gauge: [gauge, setGauge],
        stack: [stack, setStack],
        setConfig
    } = useSubjectConfig(SimpleCurrentConfigKey);

    const subjectConfig = {
        subject, equipment, level, weaponMastery, defenseMastery, movementMastery, skillLevels, gauge, stack
    }
    const status = useStatus(subjectConfig);
    const damageInFormula = React.useState(false);
    const weaponTypeID = React.useMemo(() => {
        if (!equipment.weapon) return undefined;
        return equipmentStatus(equipment.weapon).type;
    }, [equipment.weapon])

    const parentRef = React.useRef<HTMLDivElement>(null);
    const [collapse, setCollapse] = React.useState(false);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    const [showingLoad, toggleShowingLoad] = useToggle(false);
    const [showingSave, toggleShowingSave] = useToggle(false);

    const { builds, saveNew } = useBuildStorage();
    const { currentBuildKey, setCurrentBuildKey } = useStorageOnSimple();
    const currentBuild = React.useMemo(() => {
        return builds.find(b => b.key == currentBuildKey);
    }, [builds.length, currentBuildKey]);

    return (
        <main className={style.simple} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <header className={style.header} style={collapse ? {flexDirection: "column"} : undefined}>
                    <div className={style.storage}>
                        <h1>保存名：{currentBuild?.name ?? "-----"}</h1>
                        <div>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={toggleShowingLoad}>ロード</button>
                            {currentBuild?.isPreset || currentBuild == undefined ? null : <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={toggleShowingSave}>上書き保存</button>}
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={toggleShowingSave}>新規保存</button>
                        </div>
                    </div>
                    <div className={styles(style.formula, damageInFormula[0] ? style.on : undefined)}>
                        <Switch {...damageInFormula} />
                        <p>ツールチップ詳細表記</p>
                    </div>
                </header>
                <CollapseTab collapse={collapse}>
                    <Subject 
                        subject={[subject, setSubject]} 
                        level={[level, setLevel]}
                        skillLevels={[skillLevels, setSkillLevels]}
                        weaponMastery={[weaponMastery, setWeaponMastery]}
                        defenseMastery={[defenseMastery, setDefenseMastery]}
                        movementMastery={[movementMastery, setMovementMastery]}
                        equipment={[equipment, setEquipment]}
                        status={status}
                        gauge={[gauge, setGauge]}
                        hideHeader={collapse}
                    />
                    <BuffDebuffs hideHeader={collapse} />
                    <Damage
                        config={subjectConfig}
                        status={status[0]}
                        setSkillLevels={setSkillLevels}
                        weaponType={weaponTypeID as (WeaponTypeID | undefined)}
                        hideHeader={collapse}
                    />
                </CollapseTab>
            </div>
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;

                    const [item, onSlot] = content.split("%");
                    const props: SubjectSkillProps | undefined = onSlot ? {
                        showEquation: damageInFormula[0],
                        config: subjectConfig,
                        status: status[0]
                    } : undefined;

                    return <ItemTooltip itemID={item} {...props} />;
                }}
            />
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;
                    const [subject, skill] = content?.split("-");
                    return (
                        <SubjectSkillTooltip 
                            id={subject} 
                            skill={skill as any} 
                            showEquation={damageInFormula[0]}
                            status={status[0]} 
                            config={subjectConfig!} 
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
                    return (
                        <WeaponSkillTooltip
                            showEquation={damageInFormula[0]}
                            status={status[0]} 
                            config={subjectConfig!} 
                        />
                    );
                }}
            />
            <Modal 
                isOpen={showingLoad} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingLoad}
                className={loadStyle.load}
                overlayClassName={common["modal-overlay"]}
            >
                <LoadBuild currentKey={currentBuild?.key} onSelect={build => {
                    setCurrentBuildKey(build.key);
                    setConfig(build.config);
                    toggleShowingLoad(false);
                }} onDeleteCurrentBuild={() => {
                    setCurrentBuildKey(undefined);
                }} />
            </Modal>
            <Modal 
                isOpen={showingSave} 
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingSave}
                className={saveStyle.save}
                overlayClassName={common["modal-overlay"]}
            >
                <SaveBuild defaultName={name(subject, "jp")} onSave={name => {
                    toggleShowingSave(false);
                    const key = saveNew(name, subjectConfig);
                    setCurrentBuildKey(key);
                }} />
            </Modal>
        </main>
    )
};

export default index;
*/