export type BasicAttackType = {
    type: "basic",
    critical?: "none" | "confirmed" // if it is undefined, calculate critical hit as same as standard auto-attack
    hitCount?: number
}

export type SkillDamageType = {
    type: "skill"
}

export type TrueDamageType = {
    type: "true"
}

export type SupportType = {
    type: "heal" | "shield"
    target: "self" | "any" | "ally"
    percentExpression?: boolean
}

export type MiscValueType = {
    type: "misc"
    percentExpression?: boolean
}
