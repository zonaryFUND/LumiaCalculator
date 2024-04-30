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
import { useToggle } from "react-use";
import { WeaponTypeID, equipmentStatus } from "@app/entity/equipment";

const index: React.FC = props => {
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

    return (
        <main className={style.simple}>
            <div className={style.parent}>
                <header className={style.storage}>
                    <h1>保存名：{buildName ?? "-----"}</h1>
                    <div>
                        <button className={`${common["system-button"]} ${common["button-medium"]}`}>ロード</button>
                        <button className={`${common["system-button"]} ${common["button-medium"]}`}>{buildName == null ? "新規保存" : "上書き保存"}</button>
                    </div>
                </header>
                <div className={style.base}>
                    <Subject 
                        subject={[subject, setSubject]} 
                        level={[level, setLevel]}
                        skillLevels={[skillLevels, setSkillLevels]}
                        weaponMastery={[weaponMastery, setWeaponMastery]}
                        defenseMastery={[defenseMastery, setDefenseMastery]}
                        movementMastery={[movementMastery, setMovementMastery]}
                        equipment={[equipment, setEquipment]}
                        status={status}
                    />
                    <BuffDebuffs />
                    <Damage subject={subject} equipment={equipment} weaponMastery={weaponMastery} skillLevels={[skillLevels, setSkillLevels]} showEquation={damageInFormula} />
                </div>
            </div>
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                render={({ content, activeAnchor }) => content ? <ItemTooltip itemID={content}/> : null}
            />
            <Tooltip 
                id="subject-skill"
                className={`${style.tooltip}`}
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
                delayHide={1000000}
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