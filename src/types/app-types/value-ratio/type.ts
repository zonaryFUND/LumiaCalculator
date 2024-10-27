export type ValueElement = number | number[] | ValueRatio

export type Source = {
    skill: "Q" | "W" | "E" | "R" | "T" | "D" | "tactical"
    level: number
} | "other"

const RATIO_KEYS = [
    "base",
    "level",
    "maxHP",
    "additionalMaxHP",
    "maxSP",
    "defense",
    "attack",
    "additionalAttack",
    "basicAttackAmp",
    "criticalChance",
    "additionalAttackSpeed",
    "amp",
    "stack",
    "gauge",
    "summonedAttack",
    "targetMaxHP",
    "targetHP",
    "lostHP",
    "max"
] as const;
type RatioKeys = typeof RATIO_KEYS[number];

export type ValueRatio = Partial<{[key in RatioKeys]: ValueElement}>

export function isValueRatio(arg: any): arg is ValueRatio {
    return RATIO_KEYS.findIndex(key => arg[key] != undefined) > -1;
}