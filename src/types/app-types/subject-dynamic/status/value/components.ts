import Decimal from "decimal.js"

export type StatusValueComponent = {
    origin: "subject-status" | "equipment" | "perpetual_status" | "temporary-status"
    calculationType: "sum" | "mul" | "fix"
    intlID?: string
    value: 
        { type: "constant", constant: Decimal.Value } |
        { 
            type: "level-dependent", 
            incrementalFactor: { type: "level" | "mastery", value: Decimal.Value }, 
            multiplier: Decimal.Value 
        } |
        { 
            type: "combined", 
            constant: Decimal.Value, 
            incrementalFactor: { type: "level" | "mastery", value: Decimal.Value }, 
            muliplier: Decimal.Value
        }
}

export function SubjectStatus(
    base: Decimal.Value,
    level: Decimal.Value,
    levelupValue: Decimal.Value
): StatusValueComponent {
    return {
        origin: "subject-status",
        calculationType: "sum",
        value: {
            type: "combined",
            constant: base,
            incrementalFactor: {
                type: "level",
                value: level
            },
            muliplier: levelupValue
        }
    }
}

export function EquipmentConstant(value: Decimal.Value): StatusValueComponent {
    return {
        origin: "equipment",
        calculationType: "sum",
        value: {
            type: "constant",
            constant: value
        }
    }
}

export function EquipmentLevelDependent(level: Decimal.Value, value: Decimal.Value): StatusValueComponent {
    return {
        origin: "equipment",
        calculationType: "sum",
        value: {
            type: "level-dependent",
            incrementalFactor: {
                type: "level",
                value: level
            },
            multiplier: value
        }
    }
}