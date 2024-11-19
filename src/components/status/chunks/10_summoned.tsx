import * as React from "react";
import Column from "./column";
import { FirstAid, Shield, Sword, Crosshair, ArrowFatLinesUp, ShieldSlash, CaretDown, CaretUp } from "@phosphor-icons/react"
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.module.styl";
import AttackSpeed from "./attack-speed";
import useStorageBoolean from "@app/storage/boolean";
import { BasicAttackTableHiddenKey, PenetrationTableHiddenKey, ToughnessTableHiddenKey } from "@app/storage/status";

type Props = SubjectConfig & {
    selected: string
    status: Status
}
const summoned: React.FC<Props> = props => {
    const {value: hideToughness, toggleValue: toggleHideToughness} = useStorageBoolean(ToughnessTableHiddenKey);
    const {value: hideBasicAttack, toggleValue: toggleHideBasicAttack} = useStorageBoolean(BasicAttackTableHiddenKey);
    const {value: hidePenetration, toggleValue: toggleHidePenetration} = useStorageBoolean(PenetrationTableHiddenKey);

    const targetStatus = props.status.summoned!.find(entry => entry.nameIntlID == props.selected)?.status;

    const summonedEffectiveToughness = React.useMemo(() => {
        if (targetStatus == undefined) return null;
        return targetStatus?.maxHP.times(targetStatus.defense.add(100).dividedBy(100));
    }, [targetStatus?.maxHP, targetStatus?.defense]);

    return (
        <>
            <tbody>
                <tr className={table.separator} onClick={toggleHideToughness}>
                    <td colSpan={2}><div><p>耐久 / 実効体力: {summonedEffectiveToughness?.toString()}</p>{hideToughness ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><FirstAid weight="fill" />最大体力</>} 
                    value={targetStatus!.maxHP} 
                    isHidden={hideToughness} 
                />
                <Column 
                    name={<><Shield />防御力</>} 
                    value={targetStatus!.defense} 
                    isHidden={hideToughness} 
                />
            </tbody>
            <tbody>
                <tr className={table.separator} onClick={toggleHideBasicAttack}>
                    <td colSpan={2}><div><p>攻撃</p>{hideBasicAttack ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><Sword />攻撃力</>} 
                    value={targetStatus!.attackPower} 
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><AttackSpeed/>攻撃速度</>} 
                    value={targetStatus!.attackSpeed} 
                    isHidden={hideBasicAttack}
                />
                <Column 
                    name={<><Crosshair />致命打確率</>} 
                    value={targetStatus!.criticalChance} 
                    percent
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} 
                    value={targetStatus!.skillAmp} 
                    isHidden={hideBasicAttack} 
                />
            </tbody>
            <tbody>
                <tr className={table.separator} onClick={toggleHidePenetration}>
                    <td colSpan={2}><div><p>防御貫通</p>{hidePenetration ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><ShieldSlash />防御貫通(定数)</>} 
                    value={targetStatus!.armorPenetration} 
                    isHidden={hidePenetration} 
                />
                <Column 
                    name={<><ShieldSlash />防御貫通(%)</>} 
                    value={targetStatus!.armorPenetrationRatio} 
                    percent 
                    isHidden={hidePenetration}
                />
            </tbody>
        </>
    );
}

export default summoned;