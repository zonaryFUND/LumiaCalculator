import Decimal from "decimal.js";
import { SubjectConfig } from "./use-subject-config";
import { SummonedStatus } from "components/subjects/summoned-status";

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
    basicAttackReduction: Decimal
    skillReduction: Decimal

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

export type SummonedStatus = {
    maxHP: Decimal
    attackPower: Decimal
    defense: Decimal
    attackSpeed: Decimal
    criticalChance: Decimal
    skillAmp: Decimal
    armorPenetration: Decimal
    armorPenetrationRatio: Decimal
}

export type StatusOverride =  (props: StatusProps, config: SubjectConfig) => StatusProps;

export type Status = StatusProps & {
    maxHP: Decimal
    attackPower: Decimal
    additionalAttackPower: Decimal
    skillAmp: Decimal
    addAdaptiveTo: "attack" | "amp"
    withoutOverride?: StatusProps
    summonedStatus?: SummonedStatus
}

export function from(props: StatusProps, config: SubjectConfig, withoutOverride?: StatusProps): Status {
    const comparedAttack = props.baseAttackPower.add(props.baseAdditionalAttackPower);
    const comparedAmp = props.baseSkillAmp.times(props.skillAmpMultiplier.add(100).dividedBy(100));
    const addAdaptiveToAttack = props.baseAttackPower.greaterThan(comparedAmp);
    
    const subjectStatus = {
        ...props,
        maxHP: props.baseMaxHP.add(props.additionalMaxHP),
        attackPower: addAdaptiveToAttack ? comparedAttack.add(props.adaptiveStatus) : comparedAttack,
        additionalAttackPower: addAdaptiveToAttack ? 
            props.baseAdditionalAttackPower.add(props.adaptiveStatus) :
            props.baseAdditionalAttackPower,
        skillAmp: (addAdaptiveToAttack ? 
            comparedAmp : 
            props.baseSkillAmp.add(props.adaptiveStatus.times(2)).times(props.skillAmpMultiplier.add(100).dividedBy(100))).floor(),
        addAdaptiveTo: addAdaptiveToAttack ? "attack" : "amp",
        withoutOverride
    }

    const summonedStatus = (() => {
        if (!config.subject) return undefined;
        const status = SummonedStatus[config.subject]
        if (!status) return undefined;
        return status.default(subjectStatus, config);
    })();

    return {...subjectStatus as any, summonedStatus}
}
