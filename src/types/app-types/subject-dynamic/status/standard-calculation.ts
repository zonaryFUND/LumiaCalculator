import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue } from "./type";

export function standardCalc(seedValue: StatusValue, props: { level?: number, mastery?: number }, digit: number): StatusValue & CalculatedStatusValue {
    const constant = Decimal.sum(
        ...[
            seedValue.base,
            seedValue.equipment?.constant,
            seedValue.equipment?.adaptive,
            seedValue.overrideAdditional?.value,
            new Decimal(0)
        ]
        .filter((v): v is Decimal => v !== undefined)
    );

    const ratio = Decimal.sum(
        ...[
            seedValue.equipment?.ratio,
            seedValue.perMastery?.ratio?.times(props.mastery ?? 0),
            new Decimal(0)
        ]
        .filter((v): v is Decimal => v !== undefined)
    )

    return {
        ...seedValue,
        calculatedValue: constant
            .add(seedValue.perLevel?.times((props.level ?? 0) - 1) ?? 0)
            .add(seedValue.equipment?.perLevel?.times(props.level ?? 0) ?? 0)
            .add(seedValue.perMastery?.value?.times(props.mastery ?? 0) ?? 0)
            .addPercent(ratio)
            .cut(digit, "round")
    }
}