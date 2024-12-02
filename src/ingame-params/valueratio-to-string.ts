import { ValueRatio } from "app-types/value-ratio";
import { TooltipValueToString } from "./skill-tooltip-props";

export const RatioPercent = (value: TooltipValueToString["value"]) => ({ 
    value, 
    expression: calculated => `${calculated}%` 
}) satisfies TooltipValueToString;

export const CriticalMultipier = (ratio: number) => ({
    value: {base: 100, criticalChance: ratio} satisfies ValueRatio,
    expression: calculated => `${(+calculated - 100)}%`
}) satisfies TooltipValueToString