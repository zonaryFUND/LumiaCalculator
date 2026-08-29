import { ValueTableUnitMultiplier } from "core/damage-table/unit"

export type MultiplierExpression = {
    label?: string
    value: number
}

export type ExtractedMultiplier = {
    mergedMultiplier: number
    individualExpressions: MultiplierExpression[]
}

export function extractMultiplier(multiplier?: ValueTableUnitMultiplier, skillLevel?: number): ExtractedMultiplier | undefined {
    if (multiplier == undefined) return undefined;

    if (typeof multiplier == "number") 
        return {
            mergedMultiplier: multiplier,
            individualExpressions: [{value: multiplier}]
        };

    if (typeof multiplier[0] == "number") {
        if (skillLevel == undefined) {
            throw new Error("level-dependent multiplier is extracted without its skill level.")
        }

        const value = multiplier[skillLevel] as number;

        return {
            mergedMultiplier: value,
            individualExpressions: [{value}]
        }
    }

    return multiplier.reduce((prev, current) => {
        if (typeof current == "number") 
            return {
                mergedMultiplier: prev.mergedMultiplier * current / 100,
                individualExpressions: prev.individualExpressions.concat({value: current})
            };

        if (typeof current.value == "number") 
            return {
                mergedMultiplier: prev.mergedMultiplier * current.value / 100,
                individualExpressions: prev.individualExpressions.concat({label: current.label, value: current.value})
            }

        if (skillLevel == undefined) {
            throw new Error("level-dependent multiplier is extracted without its skill level.")
        }

        return {
            mergedMultiplier: prev.mergedMultiplier * current.value[skillLevel] / 100,
            individualExpressions: prev.individualExpressions.concat({label: current.label, value: current.value[skillLevel]})
        }
    }, {mergedMultiplier: 100, individualExpressions: [] as MultiplierExpression[]});
}