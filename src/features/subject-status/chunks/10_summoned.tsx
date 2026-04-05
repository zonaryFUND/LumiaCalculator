import * as React from "react";
import Column from "../components/column";
import { FirstAid, Shield, Sword, Crosshair, ArrowFatLinesUp, ShieldSlash, CaretDown, CaretUp } from "@phosphor-icons/react"

import AttackSpeed from "./attack-speed";
import useStorageBoolean from "@app/storage/boolean";
import { BasicAttackTableHiddenKey, PenetrationTableHiddenKey, ToughnessTableHiddenKey } from "@app/storage/status";
import { useSubjectStateStore } from "@app/features/subject-config/store";
import ChunkHeader from "./chunk-header";

type Props = {
    selectedSummonedObject: string
}

const summoned: React.FC<Props> = props => {
    const targetSummonedStatus = useSubjectStateStore(s => s.status.summoned?.find(entry => entry.nameIntlID == props.selectedSummonedObject)?.status);
    if (targetSummonedStatus == undefined) {
        throw new Error("Selected summoned object not found");
    }

    const {value: hideToughness, toggleValue: toggleHideToughness} = useStorageBoolean(ToughnessTableHiddenKey);
    const {value: hideBasicAttack, toggleValue: toggleHideBasicAttack} = useStorageBoolean(BasicAttackTableHiddenKey);
    const {value: hidePenetration, toggleValue: toggleHidePenetration} = useStorageBoolean(PenetrationTableHiddenKey);

    const summonedEffectiveToughness = React.useMemo(() => {
        return targetSummonedStatus.maxHP.times(targetSummonedStatus.defense.add(100).dividedBy(100));
    }, [targetSummonedStatus.maxHP, targetSummonedStatus.defense]);

    return (
        <>
            <tbody>
                <ChunkHeader 
                    intlID="耐久"
                    hidden={hideToughness}
                    toggleHidden={toggleHideToughness}
                    additionalHead={<> / 実効体力: {summonedEffectiveToughness?.toString()}</>}
                />
                <Column 
                    name={<><FirstAid weight="fill" />最大体力</>} 
                    value={targetSummonedStatus.maxHP} 
                    isHidden={hideToughness} 
                />
                <Column 
                    name={<><Shield />防御力</>} 
                    value={targetSummonedStatus.defense} 
                    isHidden={hideToughness} 
                />
            </tbody>
            <tbody>
                <ChunkHeader 
                    intlID="攻撃"
                    hidden={hideBasicAttack}
                    toggleHidden={toggleHideBasicAttack}
                />
                <Column 
                    name={<><Sword />攻撃力</>} 
                    value={targetSummonedStatus.attackPower} 
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><AttackSpeed/>攻撃速度</>} 
                    value={targetSummonedStatus.attackSpeed} 
                    isHidden={hideBasicAttack}
                />
                <Column 
                    name={<><Crosshair />致命打確率</>} 
                    value={targetSummonedStatus.criticalChance} 
                    percent
                    isHidden={hideBasicAttack} 
                />
                <Column 
                    name={<><ArrowFatLinesUp weight="fill" />スキル増幅</>} 
                    value={targetSummonedStatus.skillAmp} 
                    isHidden={hideBasicAttack} 
                />
            </tbody>
            <tbody>
                <ChunkHeader 
                    intlID="防御貫通"
                    hidden={hidePenetration}
                    toggleHidden={toggleHidePenetration}
                />
                <Column 
                    name={<><ShieldSlash />防御貫通(定数)</>} 
                    value={targetSummonedStatus.armorPenetration} 
                    isHidden={hidePenetration} 
                />
                <Column 
                    name={<><ShieldSlash />防御貫通(%)</>} 
                    value={targetSummonedStatus.armorPenetrationRatio} 
                    percent 
                    isHidden={hidePenetration}
                />
            </tbody>
        </>
    );
}

export default summoned;