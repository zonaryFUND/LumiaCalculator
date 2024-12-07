import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue, AdditionalStatusValue } from "./type";
import { standardCalc } from "./standard-calculation";

export function maxHPCalc(seedValue: StatusValue, props: { level: number }): StatusValue & AdditionalStatusValue & CalculatedStatusValue {
    const additional = (seedValue.equipment?.constant ?? new Decimal(0)).add(seedValue.equipment?.perLevel?.times(props.level) ?? 0);

    return {
        ...standardCalc(seedValue, props, 0),
        additionalValue: additional
    }
}