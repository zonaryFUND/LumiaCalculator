import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue } from "./type";

export function defenseMasteryCalc(seedValue: StatusValue, props: { mastery: number }): StatusValue & CalculatedStatusValue {
    return {
        ...seedValue,
        calculatedValue: seedValue.perMastery!.ratio!.times(props.mastery).add(seedValue.equipment?.constant ?? 0)
    }
}