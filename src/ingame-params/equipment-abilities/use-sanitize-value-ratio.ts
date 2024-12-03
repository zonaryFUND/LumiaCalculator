import { ValueRatio } from "app-types/value-ratio";

export default function SanitizeValueRatio(valueRatio: ValueRatio | {melee: ValueRatio, range:  ValueRatio} | undefined): ValueRatio {
    if (valueRatio == undefined) throw new Error("item skill's value is undefined in expected situation");
    if ("melee" in valueRatio) throw new Error("item skill's value is defined as range-dependent on undesired skill");
    
    return valueRatio;
}