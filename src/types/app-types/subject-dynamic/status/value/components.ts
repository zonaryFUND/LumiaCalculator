import Decimal from "decimal.js"

export type StatusValueComponent = {
    origin: "subject-status" | "weapon-base" | "equipment" | "perpetual_status" | "temporary-status"
    calculationType: "sum" | "mul" | "fix"
    intlID?: string
    value: 
        {   
            type: "constant", 
            value: Decimal.Value 
        } |
        { 
            type: "level-dependent", 
            incrementalFactor: { type: "level" | "mastery", oneBased?: boolean, value: Decimal.Value }, 
            multiplier: Decimal.Value,
            value: Decimal.Value
        } |
        { 
            type: "combined", 
            constant: Decimal.Value, 
            incrementalFactor: { type: "level" | "mastery", oneBased?: boolean, value: Decimal.Value }, 
            multiplier: Decimal.Value,
            value: Decimal.Value
        } | 
        {
            type: "weapon-base",
            subject: Decimal.Value,
            weapon?: Decimal.Value,
            value: Decimal.Value
        }
}

export function SubjectStatus(
    base: Decimal.Value,
    level: Decimal.Value,
    levelupValue: Decimal.Value | undefined
): StatusValueComponent {
    return {
        origin: "subject-status",
        calculationType: "sum",
        value: levelupValue != undefined ?
            {
                type: "combined",
                constant: base,
                incrementalFactor: {
                    type: "level",
                    oneBased: true,
                    value: level
                },
                multiplier: levelupValue,
                value: new Decimal(level).sub(1).times(levelupValue).add(base)
            } 
            : 
            {
                type: "constant",
                value: base
            }
    }
}

export function Mastery(
    calculationType: "sum" | "mul",
    mastery: Decimal.Value,
    multiplier: Decimal.Value
): StatusValueComponent {
    return {
        origin: "subject-status",
        calculationType,
        intlID: "app.mastery",
        value: {
            type: "level-dependent",
            incrementalFactor: {
                type: "mastery",
                value: mastery
            },
            multiplier,
            value: new Decimal(mastery).mul(multiplier)
        }
    }
}

export function WeaponBasedValue(
    subject: Decimal.Value,
    weapon?: Decimal.Value
): (StatusValueComponent | undefined) {
    return {
        origin: "weapon-base",
        calculationType: "sum",
        value: {
            type: "weapon-base",
            subject,
            weapon,
            value: new Decimal(subject).add(weapon ?? 0)
        }
    }
}

export function Adaptive(origin: StatusValueComponent["origin"], intlID: string, type: "attack" | "amp", value: Decimal.Value | undefined): StatusValueComponent | undefined {
    if (value == undefined) return undefined;
    return {
        origin,
        calculationType: "sum",
        intlID,
        value: {
            type: "constant",
            value: new Decimal(value).mul(type == "attack" ? 1 : 2)
        }
    }
}

export function EquipmentConstant(calculationType: "sum" | "mul", value: Decimal.Value | undefined): StatusValueComponent | undefined {
    if (value == undefined) return undefined;
    return {
        origin: "equipment",
        calculationType: calculationType,
        value: {
            type: "constant",
            value
        }
    }
}

export function EquipmentLevelDependent(level: Decimal.Value, value: Decimal.Value | undefined): StatusValueComponent | undefined {
    if (value == undefined) return undefined;

    return {
        origin: "equipment",
        calculationType: "sum",
        value: {
            type: "level-dependent",
            incrementalFactor: {
                type: "level",
                value: level
            },
            multiplier: value,
            value: new Decimal(value).times(level)
        }
    }
}

export function EquipmentCombined(
    base: Decimal.Value | undefined,
    level: Decimal.Value,
    levelupValue: Decimal.Value | undefined
): StatusValueComponent | undefined {
    if (base != undefined && levelupValue != undefined) {
        return {
            origin: "equipment",
            calculationType: "sum",
            value: {
                type: "combined",
                constant: base,
                incrementalFactor: {
                    type: "level",
                    value: level
                },
                multiplier: levelupValue,
                value: new Decimal(level).times(levelupValue).add(base)
            }
        }
    }

    if (base == undefined) {
        return EquipmentLevelDependent(level, levelupValue);
    }

    return EquipmentConstant("sum", base);
}