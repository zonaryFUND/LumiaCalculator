import Constants from "./constants";
import Decimal from "decimal.js";
import { SubjectPerpetualStatus } from "../type";

export function AdditionalPenetration(tSkillLevel: number, criticalChance: Decimal): Decimal {
    return new Decimal(Constants.T.defense_decline.base[tSkillLevel])
        .add(criticalChance.mul(Constants.T.defense_decline.criticalChance) ?? 0)
}

const f: SubjectPerpetualStatus = (config) => ({
    penetrationDefenseRatio: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.rio.passive-penetration",
            value: {
                type: "status-conversion",
                func: status => AdditionalPenetration(config.skillLevels.T, status.criticalStrikeChance.calculatedValue)
            }
        }
    ]
});

export default f;
