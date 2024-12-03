import { ValueRatio } from "app-types/value-ratio";
import { TooltipValue, TooltipValues, TooltipValueToString } from "./skill-tooltip-props";

export function FilterUndefined(values: Partial<TooltipValues>): TooltipValues {
    return Object.entries(values).reduce((prev, [key, value]) => {
        return value == undefined ? prev : {...prev, [key]: value}
    }, {} satisfies TooltipValues)
}

export const RatioPercent = (value: TooltipValueToString["value"]) => ({ 
    value, 
    expression: calculated => `${calculated}%` 
}) satisfies TooltipValueToString;

export const RatioPercentOptional = (value: TooltipValueToString["value"] | undefined) => {
    return value == undefined ? undefined : RatioPercent(value)
}

export const CriticalMultipier = (ratio: number) => ({
    value: {base: 100, criticalChance: ratio} satisfies ValueRatio,
    expression: calculated => `${(+calculated - 100)}%`
}) satisfies TooltipValueToString
