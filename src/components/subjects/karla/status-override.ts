import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";

export default function(status: StatusProps): StatusProps {
    const threshold = new Decimal(Constants.T.max_attack_speed);
    if (status.attackSpeed.calculated.greaterThan(threshold)) {
        const excess = new Decimal(threshold).sub(status.attackSpeed.calculated);
        const convertedAmp = excess.times(Constants.T.amp_conversion).times(100);
        return {
            ...status,
            attackSpeed: {
                ...status.attackSpeed,
                calculated: threshold
            },
            baseSkillAmp: status.baseSkillAmp.add(convertedAmp)
        }
    } else {
        return status;
    }
}