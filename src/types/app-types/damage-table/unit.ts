import { ValueRatio } from "app-types/value-ratio"
import { BasicAttackType, MiscValueType, SkillDamageType, SupportType, TrueDamageType } from "./value-type"

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
    damageDependentHeal?: number | number[]
}
