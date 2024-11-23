import { TooltipValueToString } from "./dictionary";


export const RatioPercent = (value: TooltipValueToString["value"]) => ({ 
    value, 
    expression: calculated => `${calculated}%` 
}) satisfies TooltipValueToString