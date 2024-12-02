export type MultiplierExpression = {
    label?: string
    value: number
}

export function extractMultiplier(skillLevel?: number, multiplier?: number | number[] | {label?: string, value: number | number[]}[]): [number, MultiplierExpression[]] | undefined {
    if (multiplier == undefined) return undefined;

    if (typeof multiplier == "number") return [multiplier, [{value: multiplier}]];

    if (typeof multiplier[0] == "number") {
        if (skillLevel == undefined) {
            throw new Error("level-dependent multiplier is extracted without its skill level.")
        }

        const value = multiplier[skillLevel] as number;
        return [value, [{value}]];
    }

    return multiplier.reduce((prev, current) => {
        if (typeof current == "number") return [prev[0] * current / 100, prev[1].concat({value: current})];
        if (typeof current.value == "number") return [prev[0] * current.value / 100, prev[1].concat({label: current.label, value: current.value})];

        if (skillLevel == undefined) {
            throw new Error("level-dependent multiplier is extracted without its skill level.")
        }

        return [prev[0] * current.value[skillLevel] / 100, prev[1].concat({label: current.label, value: current.value[skillLevel]})];
    }, [100, [] as MultiplierExpression[]]);
}