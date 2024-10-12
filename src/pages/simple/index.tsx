import * as React from "react";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import common from "@app/common.styl";

import { Gear } from "@phosphor-icons/react"

import style from "./index.module.styl";

import Subject from "../simple/subject";
import BuffDebuffs from "./buff-debuffs";
import Damage from "./damage";
import ItemTooltip from "components/tooltip/item/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";

import { useLocalStorage, useToggle, useWindowSize } from "react-use";
import { equipmentStatus } from "app-types/equipment";
import CollapseTab from "components/common/collapse-tab";
import { styles } from "@app/util/style";
import { BuildWithKey, useBuildStorage } from "@app/storage/build";
import { SimpleCurrentConfigKey, useStorageOnSimple } from "@app/storage/simple";
import useSubjectConfig from "app-types/subject-dynamic/config/use-subject-config";
import { SubjectConfig } from "app-types/subject-dynamic/config/type";
import { useStatus } from "app-types/subject-dynamic/status/use-status";
import { SubjectSkillProps } from "components/subjects/props";
import { WeaponTypeID } from "app-types/equipment/weapon";
import { name } from "app-types/subject-static";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";

const index: React.FC = props => {
    const { width } = useWindowSize();

    const [storageConfig, saveConfig] = useLocalStorage<SubjectConfig>(SimpleCurrentConfigKey);
    const {
        value: config,
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
    } = useSubjectConfig({value: storageConfig, update: saveConfig});

    const status = useStatus(config);
    const damageInFormula = useStorageBoolean(DetailedTooltipKey);
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

    const onLoadBuild = React.useCallback((buildWithKey: BuildWithKey) => {
        setConfig(buildWithKey.config);
        setCurrentBuildKey(buildWithKey.key);
        toggleShowingLoad();
    }, []);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

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
                    <div className={style.config}>
                        <Gear fontSize={44} weight="fill" onClick={toggleShowingPreference}  />
                    </div>
                </header>
                <CollapseTab collapse={collapse}>
                    <Subject 
                        subject={[subject, setSubject]} 
                        config={config!}
                        level={[level, setLevel]}
                        skillLevels={[skillLevels, setSkillLevels]}
                        weaponMastery={[weaponMastery, setWeaponMastery]}
                        defenseMastery={[defenseMastery, setDefenseMastery]}
                        movementMastery={[movementMastery, setMovementMastery]}
                        equipment={[equipment, setEquipment]}
                        status={status}
                        gauge={[gauge, setGauge]}
                        stack={[stack, setStack]}
                        hideHeader={collapse}
                    />
                    <BuffDebuffs hideHeader={collapse} />
                    <Damage
                        config={config}
                        status={status}
                        setSkillLevels={setSkillLevels}
                        weaponType={weaponTypeID as (WeaponTypeID | undefined)}
                        hideHeader={collapse}
                    />
                </CollapseTab>
            </div>
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
                            status={status} 
                            config={config} 
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
                            status={status} 
                            config={config} 
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
                    const props: SubjectSkillProps = {
                        showEquation: damageInFormula[0] || onSlot == undefined,
                        config,
                        status
                    };

                    return <ItemTooltip itemID={item} {...props} />;
                }}
            />            
            <Modal
                isOpen={showingLoad}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingLoad}
                className={loadStyle.load}
                overlayClassName={common["modal-overlay"]}
            >
                <LoadBuild 
                    onSelect={onLoadBuild} 
                    onDeleteCurrentBuild={() =>   setCurrentBuildKey(undefined)} 
                />
            </Modal>
            <Modal
                isOpen={showingSave}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingSave}
                className={saveStyle.save}
                overlayClassName={common["modal-overlay"]}
            >
                <SaveBuild 
                    defaultName={name(config.subject, "jp")}
                    onSave={name => {
                        toggleShowingSave(false);
                        const key = saveNew(name, config);
                        setCurrentBuildKey(key);
                    }}
                />
            </Modal>
            <Modal
                isOpen={showingPreference}
                shouldCloseOnOverlayClick
                onRequestClose={toggleShowingPreference}
                className={preferenceStyle.preference}
                overlayClassName={common["modal-overlay"]}
            >
                <Preference damageInFormula={damageInFormula} />
            </Modal>
        </main>
    )
};

export default index;