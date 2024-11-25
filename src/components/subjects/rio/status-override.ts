import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";

export function additionalPenetration(tSkillLevel: number, criticalChance: Decimal): Decimal {
    return new Decimal(Constants.T.defense_decline.base[tSkillLevel])
        .add(criticalChance.mul(Constants.T.defense_decline.criticalChance) ?? 0)
}

const f: StatusOverrideFunc = (status, config) => {
    const additional = additionalPenetration(config.skillLevels.T, status.criticalChance.equipment?.constant ?? new Decimal(0));

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
