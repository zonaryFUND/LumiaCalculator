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
                    />
                    <BuffDebuffs />
                    <Damage />
                </div>
            </div>
            <Tooltip 
                id="weapon"
                className={style.tooltip}
                render={({ content, activeAnchor }) => content ? <ItemTooltip itemID={content}/> : null}
            />
        </main>
    )
};

export default index;