import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    criticalStrikeChance: AddComponent(status.criticalStrikeChance, status.criticalStrikeDamage.calculatedValue.greaterThan(0) ? {
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "subject.debi_marlene.passive-critical-chance",
        value: {
            type: "constant",
            value: status.criticalStrikeDamage.calculatedValue.times(Constants.T.critical_damage_to_chance)
        } 
    } : undefined)
});

export default f;
