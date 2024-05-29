import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";
import { standardCalc } from "./standard-calculation";

export function defenseCalc(seedValue: StatusValue, level: number): StatusValue & AdditionalStatusValue & CalculatedStatusValue {
    const additional = (seedValue.equipment?.constant ?? new Decimal(0));
    const standard = standardCalc(seedValue, {level}, 0);
    console.log(standard)

    return {
        ...standard,
        additional
    }
}