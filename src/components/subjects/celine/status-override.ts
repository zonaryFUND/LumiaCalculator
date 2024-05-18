import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";

export function additionalAmp(status: StatusBeforeCalculation): Decimal {
    return status.cooldownReduction.calculatedValue?.times(Constants.T.cooldown_conversion) ?? new Decimal(0);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.celine.passive-amp",
            value: additionalAmp(status)
        }
    }
});

export default f;
