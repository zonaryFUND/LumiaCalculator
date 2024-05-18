import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";
import { MovementSpeedPerMastery } from "./standard-values";

export function movementSpeedSpeedCalc(seedValue: StatusValue, props: { mastery: number }): StatusValue & CalculatedStatusValue {
    const constant = Decimal.sum(
        ...[
            seedValue.base,
            seedValue.equipment?.constant
        ]
        .filter((v): v is Decimal => v !== undefined)
    );

    return {
        ...seedValue,
        perMastery: {
            value: MovementSpeedPerMastery
        },
        calculatedValue: constant
            .add(MovementSpeedPerMastery.times(props.mastery).round2())
    }
}