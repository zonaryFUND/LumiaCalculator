import Decimal from "decimal.js"
import { MovementSpeedValue, StatusValue, StatusValueDefault } from "./value/type"

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

export type Status = {
    maxHp: StatusValue
    hpRegen: StatusValue
    defense: StatusValue
    preventBasicAttackDamagedRatio: StatusValue
    preventBasicAttackDamaged: StatusValue // hidden status for calculation
    preventSkillDamagedRatio: StatusValue
    maxSp: StatusValue
    spRegen: StatusValue
    attackPower: StatusValue
    increaseBasicAttackDamageRatio: StatusValue
    attackSpeed: StatusValue
    criticalStrikeChance: StatusValue
    criticalStrikeDamage: StatusValue
    skillAmp: StatusValue
    cooldownReduction: StatusValue
    cooldownLimit: StatusValue
    penetrationDefense: StatusValue
    penetrationDefenseRatio: StatusValue
    lifeSteal: StatusValue   // every damage
    normalLifeSteal: StatusValue    // AA only
    healerGiveHpHealRatio: StatusValue
    tenacity: StatusValue
    moveSpeed: MovementSpeedValue
    slowResist: StatusValue
    sightRange: StatusValue
    attackRange: StatusValue

    summoned?: {
        nameIntlID: string
        status: SummonedStatus
    }[]
}

export const BlankStatus: Status = {
    maxHp: StatusValueDefault,
    hpRegen: StatusValueDefault,
    defense: StatusValueDefault,
    preventBasicAttackDamagedRatio: StatusValueDefault,
    preventBasicAttackDamaged: StatusValueDefault,
    preventSkillDamagedRatio: StatusValueDefault,
    maxSp: StatusValueDefault,
    spRegen: StatusValueDefault,
    attackPower: StatusValueDefault,
    increaseBasicAttackDamageRatio: StatusValueDefault,
    attackSpeed: StatusValueDefault,
    criticalStrikeChance: StatusValueDefault,
    criticalStrikeDamage: StatusValueDefault,
    skillAmp: StatusValueDefault,
    cooldownReduction: StatusValueDefault,
    cooldownLimit: StatusValueDefault,
    penetrationDefense: StatusValueDefault,
    penetrationDefenseRatio: StatusValueDefault,
    lifeSteal: StatusValueDefault,   // every damage
    normalLifeSteal: StatusValueDefault,    // AA only
    healerGiveHpHealRatio: StatusValueDefault,
    tenacity: StatusValueDefault,
    moveSpeed: { components: [], calculatedValue: new Decimal(0), rawResult: new Decimal(0) },
    slowResist: StatusValueDefault,
    sightRange: StatusValueDefault,
    attackRange: StatusValueDefault
}