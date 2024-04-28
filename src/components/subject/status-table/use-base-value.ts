import Decimal from "decimal.js";
import * as React from "react";

type Props = {
    level1: Decimal
    perLevel?: Decimal
    level: number
    digit: number
    method: "floor" | "round"
}

export default function(props: Props): Decimal {
    return React.useMemo(() => {
        const value = props.perLevel ?
            props.level1.add(props.perLevel.times(props.level - 1)) :
            props.level1;

        return value.cut(props.digit, props.method);
    }, [props.level1, props.perLevel, props.level]);
}