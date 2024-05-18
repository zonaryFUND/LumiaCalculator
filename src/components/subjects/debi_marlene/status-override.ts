import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    criticalChance: {
        ...status.criticalChance,
        overrideAdditional: status.criticalDamage.calculatedValue?.greaterThan(0) ? {
            nameKey: "subject.debi_marlene.passive-critical-chance",
            value: status.criticalDamage.calculatedValue.times(Constants.T.critical_damage_to_chance)
        } : undefined
    }
});

export default f;
