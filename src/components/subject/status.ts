import Decimal from "decimal.js";
import { SubjectConfig } from "./use-subject-config";

export type StatusProps = {
    baseMaxHP: Decimal
    additionalMaxHP: Decimal
    maxSP: Decimal
    hpReg: Decimal
    spReg: Decimal

    baseAttackPower: Decimal
    baseAdditionalAttackPower: Decimal
    attackSpeed: {
        base: Decimal
        multiplier: Decimal
        calculated: Decimal
    }
    criticalChance: Decimal
    criticalDamage: Decimal
    basicAttackAmp: Decimal

    baseSkillAmp: Decimal
    skillAmpMultiplier: Decimal

    adaptiveStatus: Decimal

    cdrMax: Decimal
    cooldownReduction: Decimal

    defense: Decimal

    omnisyphon: Decimal
    lifeSteal: Decimal

    armorPenetration: Decimal
    armorPenetrationRatio: Decimal

    healPower: Decimal
    tenacity: Decimal
    
    movementSpeed: Decimal
    basicAttackRange: Decimal
    visionRange: Decimal
}

export type StatusOverride =  (props: StatusProps, config: SubjectConfig) => StatusProps;

export type Status = StatusProps & {
    attackPower: Decimal
    additionalAttackPower: Decimal
    skillAmp: Decimal
    withoutOverride?: StatusProps
}

export function from(props: StatusProps, withoutOverride?: StatusProps): Status {
    const comparedAttack = props.baseAttackPower.add(props.baseAdditionalAttackPower);
    const comparedAmp = props.baseSkillAmp.times(props.skillAmpMultiplier.add(100).dividedBy(100));
    const addAdaptiveToAttack = props.baseAttackPower.greaterThan(comparedAmp);
    
    return {
        ...props,
        attackPower: addAdaptiveToAttack ? comparedAttack.add(props.adaptiveStatus) : comparedAttack,
        additionalAttackPower: addAdaptiveToAttack ? 
            props.baseAdditionalAttackPower.add(props.adaptiveStatus) :
            props.baseAdditionalAttackPower,
        skillAmp: addAdaptiveToAttack ? 
            comparedAmp : 
            props.baseSkillAmp.add(props.adaptiveStatus.times(2)).times(props.skillAmpMultiplier.add(100).dividedBy(100)),
        withoutOverride
    }
}
