import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    criticalStrikeChance: {
        ...status.criticalStrikeChance,
        overrideAdditional: status.criticalStrikeDamage.calculatedValue?.greaterThan(0) ? {
            nameKey: "subject.debi_marlene.passive-critical-chance",
            value: status.criticalStrikeDamage.calculatedValue.times(Constants.T.critical_damage_to_chance)
        } : undefined
    }
});

export default f;
