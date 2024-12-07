import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";

export function attackSpeedCalc(seedValue: StatusValue, props: { mastery: number }): StatusValue & AdditionalStatusValue & CalculatedStatusValue {
    const constant = Decimal.sum(
        ...[
            seedValue.base,
            seedValue.equipment?.constant
        ]
        .filter((v): v is Decimal => v !== undefined)
    );

    const multiplier = (seedValue.equipment?.ratio ?? new Decimal(0))
        .add(seedValue.perMastery?.ratio?.times(props.mastery) ?? 0)
        .add(seedValue.overrideAdditional?.ratio ?? 0)

    return {
        ...seedValue,
        calculatedValue: constant
            .addPercent(multiplier).round2(),
        additionalValue: multiplier
    }
}