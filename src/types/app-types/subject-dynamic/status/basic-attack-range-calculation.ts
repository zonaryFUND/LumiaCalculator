import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";

export function basicAttackRangeCalc(seedValue: StatusValue): StatusValue & CalculatedStatusValue {
    const constant = Decimal.sum(
        ...[
            seedValue.base,
            seedValue.equipment?.constant,
            seedValue.equipment?.ratio,
            seedValue.overrideAdditional?.value
        ]
        .filter((v): v is Decimal => v !== undefined)
    );

    return {
        ...seedValue,
        calculatedValue: constant
    }
}