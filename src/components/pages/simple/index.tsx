import * as React from "react";
import common from "@app/common.styl";

import style from "./index.module.styl";
import useSubjectConfig from "components/subject/use-subject-config";
import useStatus from "components/subject/use-status";

import Subject from "./subject";
import BuffDebuffs from "./buff-debuffs";
import Damage from "./damage";

import { Tooltip } from "react-tooltip";
import ItemTooltip from "components/tooltip/item-tooltip";
import SubjectSkillTooltip from "components/tooltip/subject-skill/subject-skill-tooltip";
import WeaponSkillTooltip from "components/tooltip/subject-skill/weapon-skill-tooltip";
import { useToggle, useWindowSize } from "react-use";
import { WeaponTypeID, equipmentStatus } from "@app/entity/equipment";
import Switch from "components/common/switch";
import CollapseTab from "components/common/collapse-tab";
import { styles } from "@app/util/style";
import TabSelector from "./tab-selector";
import { SubjectSkillProps } from "components/subjects/props";

const index: React.FC = props => {
    const { width } = useWindowSize();

    const [buildName, setBuildName] = React.useState<string | null>(null)
    const {
        subject: [subject, setSubject],
        equipment: [equipment, setEquipment],
        level: [level, setLevel],
        weaponMastery: [weaponMastery, setWeaponMastery],
        defenseMastery: [defenseMastery, setDefenseMastery],
        movementMastery: [movementMastery, setMovementMastery],
        skillLevels: [skillLevels, setSkillLevels],
        gauge: [gauge, setGauge],
        stack: [stack, setStack]
    } = useSubjectConfig();

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

    return (
        <main className={style.simple} style={{paddingLeft: width > 1400 ? 266 : 80}}>
            <div className={styles(style.parent, collapse ? style.collapse : undefined)} ref={parentRef}>
                <header className={style.header} style={collapse ? {flexDirection: "column"} : undefined}>
                    <div className={style.storage}>
                        <h1>保存名：{buildName ?? "-----"}</h1>
                        <div>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`}>ロード</button>
                            <button className={`${common["system-button"]} ${common["button-medium"]}`}>{buildName == null ? "新規保存" : "上書き保存"}</button>
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
        </main>
    )
};

export default index;