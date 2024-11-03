import * as React from "react";
import Column from "./column";
import { FirstAid, Shield, Sword, Crosshair, ArrowFatLinesUp, ShieldSlash, CaretDown, CaretUp } from "@phosphor-icons/react"
import { Status } from "app-types/subject-dynamic/status/type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

import table from "components/common/table.styl";
import AttackSpeed from "./attack-speed";
import useStorageBoolean from "@app/storage/boolean";
import { BasicAttackTableHiddenKey, PenetrationTableHiddenKey, ToughnessTableHiddenKey } from "@app/storage/status";

type Props = SubjectConfig & {
    status: Status
}
const summoned: React.FC<Props> = props => {
    const {value: hideToughness, toggleValue: toggleHideToughness} = useStorageBoolean(ToughnessTableHiddenKey);
    const {value: hideBasicAttack, toggleValue: toggleHideBasicAttack} = useStorageBoolean(BasicAttackTableHiddenKey);
    const {value: hidePenetration, toggleValue: toggleHidePenetration} = useStorageBoolean(PenetrationTableHiddenKey);

    const summonedEffectiveToughness = React.useMemo(() => {
        if (props.status.summonedStatus == undefined) return null;
        return props.status.summonedStatus.maxHP.times(props.status.summonedStatus.defense.add(100).dividedBy(100));
    }, [props.status.summonedStatus?.maxHP, props.status.summonedStatus?.defense]);

    return (
        <>
            <tbody>
                <tr className={table.separator} onClick={toggleHideToughness}>
                    <td colSpan={2}><div><p>耐久 / 実効体力: {summonedEffectiveToughness?.toString()}</p>{hideToughness ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><FirstAid weight="fill" />最大体力</>} 
                    value={props.status.summonedStatus!.maxHP} 
                    isHidden={hideToughness} 
                />
                <Column 
                    name={<><Shield />防御力</>} 
                    value={props.status.summonedStatus!.defense} 
                    isHidden={hideToughness} 
                />
            </tbody>
            <tbody>
                <tr className={table.separator} onClick={toggleHideBasicAttack}>
                    <td colSpan={2}><div><p>攻撃</p>{hideBasicAttack ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><Sword />攻撃力</>} 
                    value={props.status.summonedStatus!.attackPower} 
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><AttackSpeed/>攻撃速度</>} 
                    value={props.status.summonedStatus!.attackSpeed} 
                    isHidden={hideBasicAttack}
                />
                <Column 
                    name={<><Crosshair />致命打確率</>} 
                    value={props.status.summonedStatus!.criticalChance} 
                    percent
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} 
                    value={props.status.summonedStatus!.skillAmp} 
                    isHidden={hideBasicAttack} 
                />
            </tbody>
            <tbody>
                <tr className={table.separator} onClick={toggleHidePenetration}>
                    <td colSpan={2}><div><p>防御貫通</p>{hidePenetration ? <CaretDown weight="bold" /> : <CaretUp weight="bold" />}</div></td>
                </tr>
                <Column 
                    name={<><ShieldSlash />防御貫通(定数)</>} 
                    value={props.status.summonedStatus!.armorPenetration} 
                    isHidden={hidePenetration} 
                />
                <Column 
                    name={<><ShieldSlash />防御貫通(%)</>} 
                    value={props.status.summonedStatus!.armorPenetrationRatio} 
                    percent 
                    isHidden={hidePenetration}
                />
            </tbody>
        </>
    );
}

export default summoned;