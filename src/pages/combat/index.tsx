import * as React from "react";
import Modal from "react-modal";
import { Tooltip } from "react-tooltip";
import common from "@app/common.module.styl";

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
import TooltipPresenter from "components/tooltip/skill";
import Preference from "./preference";
import preferenceStyle from "./preference.module.styl";
import useStorageBoolean from "@app/storage/boolean";
import { DetailedTooltipKey } from "@app/storage/common";
import useCombatConfig from "./use-combat-config";
import { CombatMasterySyncKey } from "@app/storage/combat";
import { useToggle, useWindowSize } from "react-use";
import { useIntl } from "react-intl";

const index: React.FC = props => {
    const intl = useIntl();
    const [collapse, setCollapse] = React.useState(false);
    const left = useCombatConfig("left");
    const right = useCombatConfig("right");

    const {value: damageInFormula, setValue: setDamageInFormula} = useStorageBoolean(DetailedTooltipKey);
    const {value: makeMasteryAlign, setValue: setMakeMasteryAlign} = useStorageBoolean(CombatMasterySyncKey);

    const { width } = useWindowSize();
    const parentRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        setCollapse(width < 996);
    }, [width]);

    React.useEffect(() => {
        if (!makeMasteryAlign) return;
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
                            modifier={{...left.modifier, currentHP: left.hp, maxHP: left.status.maxHP.calculatedValue.toNumber()}}
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
                            modifier={{...right.modifier, currentHP: right.hp, maxHP: right.status.maxHP.calculatedValue.toNumber()}}
                            status={right.status}
                            hideHeader={collapse}
                        />
                    </SubjectSideContext.Provider>
                </CollapseTab>
            </div>
            <TooltipPresenter 
                showEquation={damageInFormula}
                config={[left.config, right.config]}
                status={[left.status, right.status]}
            />
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                style={{zIndex: 1000}}
                render={({ content, activeAnchor }) => {
                    if (!content) return null;

                    const [item, onSlot] = content.split("%");
                    const side = activeAnchor?.getAttribute('data-tooltip-subject-side');

                    return <ItemTooltip 
                        itemID={+item} 
                        showEquation={damageInFormula || onSlot == undefined} 
                        config={side == "left" ? left.config : right.config} 
                        status={side == "left" ? left.status : right.status}
                    />;
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
                    defaultName={intl.formatMessage({id: `Character/Name/${(saving == "left" ? left : right).config.subject}`})}
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
                    damageInFormula={[damageInFormula, setDamageInFormula]} 
                    makeMasteryAlign={[makeMasteryAlign, setMakeMasteryAlign]} 
                />
            </Modal>
        </main>
    )
};

export default index;