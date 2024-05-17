import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";

export function basicAttackRangeCalc(seedValue: StatusValue): StatusValue & CalculatedStatusValue {
    const constant = Decimal.sum(
        ...[
            seedValue.base,
            seedValue.equipment?.constant,
            seedValue.equipment?.ratio
        ]
        .filter((v): v is Decimal => v !== undefined)
    );

    return {
        ...seedValue,
        value: constant
    }
}