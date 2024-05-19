export type ValueElement = number | number[] | ValueRatio

export type Source = {
    skill: "Q" | "W" | "E" | "R" | "T" | "D"
    level: number
} | "item"

export type ValueRatio = {
    base?: ValueElement
    level?: ValueElement
    maxHP?: ValueElement
    additionalMaxHP?: ValueElement
    defense?: ValueElement
    attack?: ValueElement
    additionalAttack?: ValueElement
    basicAttackAmp?: ValueElement
    criticalChance?: ValueElement
    additionalAttackSpeed?: ValueElement
    amp?: ValueElement

    stack?: ValueElement
    summonedAttack?: ValueElement

    targetMaxHP?: ValueElement
 
    max?: ValueElement
}