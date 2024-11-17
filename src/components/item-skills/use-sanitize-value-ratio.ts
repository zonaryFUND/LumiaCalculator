import * as React from "react";
import { ValueRatio } from "app-types/value-ratio";

export default function useSanitizedValueRatio(valueRatio: ValueRatio | {melee: ValueRatio, range: ValueRatio}): ValueRatio {
    return React.useMemo(() => {
        if ("melee" in valueRatio) throw new Error("item skill's value is defined as range-dependent on undesired skill");
        return valueRatio;
    }, [valueRatio])
}