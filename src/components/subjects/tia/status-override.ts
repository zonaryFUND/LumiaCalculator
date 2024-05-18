import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";

export function additionalAmp(status: StatusBeforeCalculation): Decimal {
    return status.cooldownReduction.calculatedValue?.times(Constants.T.cooldown_conversion / 10) ?? new Decimal(0);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.tia.passive-amp",
            value: additionalAmp(status)
        }
    }
});

export default f;
