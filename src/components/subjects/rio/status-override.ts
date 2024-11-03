import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";

export function additionalPenetration(skillLevel: number, status: StatusBeforeCalculation): Decimal {
    return new Decimal(Constants.T.defense_decline.base[skillLevel])
    .add(status.criticalChance.equipment?.constant?.mul(Constants.T.defense_decline.criticalChance) ?? 0)
}

const f: StatusOverrideFunc = (status, config) => {
    const additional = additionalPenetration(config.skillLevels.T, status);

    return {
        ...status,
        armorPenetrationRatio: {
            ...status.armorPenetrationRatio,
            overrideAdditional: {
                nameKey: "subject.rio.passive-penetration",
                value: additional
            }
        }
    }
};

export default f;
