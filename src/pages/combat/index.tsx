import * as React from "react";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import common from "@app/common.styl";

import { Gear } from "@phosphor-icons/react";

import CollapseTab from "components/common/collapse-tab";
import Subject from "./subject";
import Damage from "./damage";
import style from "./index.module.styl";
import { styles } from "@app/util/style";
import { SubjectSideContext } from "components/subjects/subject-side";
import LoadBuild from "components/modal/load-build";
import loadStyle from "components/modal/load-build/index.module.styl";
import SaveBuild from "components/modal/save-build";
import saveStyle from "components/modal/save-build/index.module.styl";

import ItemTooltip from "components/tooltip/item/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import { SubjectSkillProps } from "components/subjects/props";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";
import { name } from "app-types/subject-static";
import useCombatConfig from "./use-combat-config";
import { CombatMasterySyncKey } from "@app/storage/combat";
import { useToggle, useWindowSize } from "react-use";

const index: React.FC = props => {
    const [collapse, setCollapse] = React.useState(false);
    const left = useCombatConfig("left");
    const right = useCombatConfig("right");

    const damageInFormula = useStorageBoolean(DetailedTooltipKey);
    const makeMasteryAlign = useStorageBoolean(CombatMasterySyncKey);

    const { width } = useWindowSize();
    const parentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    React.useEffect(() => {
        if (!makeMasteryAlign[0]) return;
        right.setConfig({
            ...right.config,
            level: left.modifier.level[0],
            weaponMastery: left.modifier.weaponMastery[0],
            defenseMastery: left.modifier.defenseMastery[0],
            movementMastery: left.modifier.movementMastery[0]
        });
    }, [
        makeMasteryAlign,
        left.config.level, 
        left.config.weaponMastery, 
        left.config.defenseMastery, 
        left.config.movementMastery
    ]);

    const [loading, setLoading] = React.useState<"left" | "right" | null>(null);
    const [saving, setSaving] = React.useState<"left" | "right" | null>(null);

    const [showingPreference, toggleShowingPreference] = useToggle(false);

    return (
        <main className={style.combat} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <header className={style.header} style={collapse ? {flexDirection: "column"} : undefined}>
                    <div />
                    <div className={style.storage}>
                        <h1>左保存名：{left.currentPreset?.name ?? "-----"}</h1>
                        <div>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setLoading("left")}>ロード</button>
                            {left.currentPreset?.isPremadeSample || left.currentPreset == undefined ? null : <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={left.onOverwriteCurrentPreset}>上書き保存</button>}
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setSaving("left")}>新規保存</button>
                        </div>
                    </div>
                    <div className={style.storage}>
                        <h1>右保存名：{right.currentPreset?.name ?? "-----"}</h1>
                        <div>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setLoading("right")}>ロード</button>
                            {right.currentPreset?.isPremadeSample || right.currentPreset == undefined ? null : <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={right.onOverwriteCurrentPreset}>上書き保存</button>}
                            <button className={`${common["system-button"]} ${common["button-medium"]}`} onClick={() => setSaving("right")}>新規保存</button>
                        </div>
                    </div>
                    <div className={style.config}>
                        <Gear fontSize={44} weight="fill" onClick={toggleShowingPreference}  />
                    </div>
                </header>
                <CollapseTab collapse={collapse}>
                    <SubjectSideContext.Provider value="left">
                        <Subject
                            config={left.config}
                            modifier={left.modifier}
                            status={left.status}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                    <Damage 
                        leftStatus={left.status} 
                        rightStatus={right.status} 
                        leftConfig={left.config} 
                        rightConfig={right.config} 
                        leftHP={left.hp[0]} 
                        rightHP={right.hp[0]} 
                    />
                    <SubjectSideContext.Provider value="right">
                        <Subject
                            config={right.config}
                            modifier={right.modifier}
                            status={right.status}
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
                            status={side == "left" ? left.status : right.status} 
                            config={side == "left" ? left.config : right.config} 
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
                            status={side == "left" ? left.status : right.status} 
                            config={side == "left" ? left.config : right.config} 
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
                        config: side == "left" ? left.config : right.config,
                        status: side == "left" ? left.status : right.status
                    };

                    return <ItemTooltip itemID={item} {...props} />;
                }}
            />
            <Modal
                isOpen={loading != null}
                shouldCloseOnOverlayClick
                onRequestClose={() => setLoading(null)}
                className={loadStyle.load}
                overlayClassName={common["modal-overlay"]}
            >
                <LoadBuild 
                    onSelect={preset => {
                        (loading == "left" ? left.onLoadPreset : right.onLoadPreset)(preset);
                        setLoading(null);
                    }} 
                    onDeleteCurrentBuild={() => (loading == "left" ? left.onDeleteCurrentPreset : right.onDeleteCurrentPreset)()} 
                />
            </Modal>
            <Modal
                isOpen={saving != null}
                shouldCloseOnOverlayClick
                onRequestClose={() => setSaving(null)}
                className={saveStyle.save}
                overlayClassName={common["modal-overlay"]}
            >
                <SaveBuild 
                    defaultName={name(saving == "left" ? left.config.subject : right.config.subject, "jp")}
                    onSave={name => {
                        (saving == "left" ? left.onSavePreset : right.onSavePreset)(name);
                        setSaving(null);
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
                <Preference 
                    damageInFormula={damageInFormula} 
                    makeMasteryAlign={makeMasteryAlign} 
                />
            </Modal>
        </main>
    )
};

export default index;