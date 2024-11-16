import Decimal from "decimal.js";
import { WeaponTypeID } from "./weapon";
import { ArmorTypeID } from "./armor";
import { EquipmentAbility } from "./ability";

export type Tier = "Epic" | "Legend" | "Mythic";

/*
export const PerLevelStatusKeys = [
    "attack_power", "skill_amp", "max_hp", "aa_amp"
] as const;

export type PerLevelStatus = {
    type: typeof PerLevelStatusKeys[number]
    value: Decimal
};
*/

export type EquipmentStatus = {
    type: WeaponTypeID | ArmorTypeID
    itemGrade: Tier

    attackPower?: Decimal
    attackPowerByLv?: Decimal
    defense?: Decimal
    // defenseByLv: Decimal
    skillAmp?: Decimal
    skillAmpByLevel?: Decimal
    // skillAmpRatio?: Decimal
    // skillAmpRatioByLevel?: Decimal
    adaptiveForce?: Decimal
    adaptiveForceByLevel?: Decimal
    maxHp?: Decimal
    maxHpByLv?: Decimal
    maxSp?: Decimal
    hpRegenRatio?: Decimal
    // hpRegen?: Decimal
    spRegenRatio?: Decimal
    // spRegen: Decimal
    attackSpeedRatio?: Decimal
    // attackSpeedRatioByLv: Decimal
    criticalStrikeChance?: Decimal
    criticalStrikeDamage?: Decimal
    // preventCriticalStrikeDamaged?: Decimal
    cooldownReduction?: Decimal
    // cooldownLimit?: Decimal // unique only
    lifeSteal?: Decimal
    normalLifeSteal?: Decimal
    // skillLifeSteal?: Decimal
    moveSpeed?: Decimal
    // moveSpeedOutOfCombat?: Decimal
    sightRange?: Decimal
    // attackRange?: Decimal // unique only
    // increaseBasicAttackDamage?: Decimal
    // increaseBasicAttackDamageByLv?: Decimal
    // preventBasicAttackDamaged?: Decimal
    // preventBasicAttackDamagedByLv?: Decimal
    // preventBasicAttackDamagedRatio?: Decimal
    // preventBasicAttackDamagedRatioByLv?: Decimal
    // increaseBasicAttackDamageRatio?: Decimal
    increaseBasicAttackDamageRatioByLv?: Decimal
    // preventSkillDamaged?: Decimal
    // preventSkillDamagedByLv?: Decimal
    preventSkillDamagedRatio?: Decimal
    // preventSkillDamagedRatioByLv": Decimal
    penetrationDefense?: Decimal
    penetrationDefenseRatio?: Decimal
    // trapDamageReduce?: Decimal
    // trapDamageReduceRatio?: Decimal
    // hpHealedIncreaseRatio?: Decimal // incoming heal only, it is deprecated
    healerGiveHpHealRatio?: Decimal
    uniqueAttackRange?: Decimal
    // uniqueHpHealedIncreaseRatio?: Decimal
    uniqueCooldownLimit?: Decimal
    uniqueTenacity?: Decimal
    // uniqueMoveSpeed?: Decimal
    // uniquePenetrationDefense?: Decimal
    // uniquePenetrationDefenseRatio?: Decimal
    // uniqueLifeSteal?: Decimal
    uniqueSkillAmpRatio?: Decimal

    ammo?: Decimal
    option?: EquipmentAbility[]
}
