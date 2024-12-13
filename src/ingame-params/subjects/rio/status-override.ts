import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

export function AdditionalPenetration(tSkillLevel: number, criticalChance: Decimal): Decimal {
    return new Decimal(Constants.T.defense_decline.base[tSkillLevel])
        .add(criticalChance.mul(Constants.T.defense_decline.criticalChance) ?? 0)
}

const f: StatusOverrideFunc = (status, config) => {
    return {
        ...status,
        penetrationDefenseRatio: AddComponent(status.penetrationDefenseRatio,
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "subject.rio.passive-penetration",
                value: {
                    type: "constant",
                    value: AdditionalPenetration(config.skillLevels.T, status.criticalStrikeChance.calculatedValue)
                }
            }
        )
    }
};

export default f;
