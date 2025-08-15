import { SubjectPerpetualStatus } from "../type";
import Constants from "./constants.json";

const f: SubjectPerpetualStatus = () => ({
    criticalStrikeChance: [{
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "subject.debi_marlene.passive-critical-chance",
        value: {
            type: "status-conversion",
            func: status => status.criticalStrikeDamage.calculatedValue.times(Constants.T.critical_damage_to_chance)
        } 
    }]
});

export default f;
