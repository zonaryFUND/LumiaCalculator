import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

export function AdditionalAmp(cooldown: Decimal): Decimal {
    return cooldown.times(Constants.T.cooldown_conversion);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: AddComponent(status.skillAmp, status.cooldownReduction.calculatedValue.greaterThan(0) ? {
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "subject.tia.passive-amp",
        value: {
            type: "constant",
            value: AdditionalAmp(status.cooldownReduction.rawHasteValue)
        }
    } : undefined)
});

export default f;
