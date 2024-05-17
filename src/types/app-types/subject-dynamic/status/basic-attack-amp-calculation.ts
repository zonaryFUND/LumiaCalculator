import Decimal from "decimal.js";
import { StatusValue, CalculatedStatusValue } from "./type";

export function basicAttackAmpCalc(seedValue: StatusValue, props: { level: number, mastery: number }): StatusValue & CalculatedStatusValue {
    const equipment = seedValue.equipment?.perLevel?.times(props.level);
    const mastery = seedValue.perMastery?.ratio?.times(props.mastery);

    return {
        ...seedValue,
        value: Decimal.sum(...[equipment, mastery, new Decimal(0)].filter((v): v is Decimal => v !== undefined))
    }
}