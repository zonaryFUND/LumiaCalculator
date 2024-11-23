import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";

export type ValueRatioToString = { ratio: ValueRatio, expression: (calculated: Decimal) => string };

export const RatioPercent = (ratio: ValueRatio) => ({ 
    ratio, 
    expression: calculated => `${calculated.toString()}%` 
}) satisfies ValueRatioToString