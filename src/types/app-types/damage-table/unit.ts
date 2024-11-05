import { ValueRatio } from "app-types/value-ratio"
import { BasicAttackType, MiscValueType, SkillDamageType, SupportType, TrueDamageType } from "./value-type"
import Decimal from "decimal.js";

export type DamageDependentHealStrategy = (props: {
    potency: Decimal,
    calculatedDamage: Decimal
}) => {
    baseValue: Decimal
    multiplier: Decimal
    heal: Decimal
};

export type DamageTableUnit = {
    label: string
    value: ValueRatio

    // if undefined, it means skill damage (for conveneince)
    type?: BasicAttackType | SkillDamageType | TrueDamageType | SupportType | MiscValueType

    multiplier?: number | number[] | {
        label?: string,
        value: number | number[]
    }[]

    triggeredOnBasicAttack?: boolean

    // heal amount dependent on the damage dealt and it is not displayed on simple page
    damageDependentHeal?: number | number[] | DamageDependentHealStrategy
}
