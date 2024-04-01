import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectConfig } from "components/subject/use-subject-config";

export function additionalAmp(status: StatusProps, config: SubjectConfig): Decimal {
    const additionalAS = status.attackSpeed.base.times(status.attackSpeed.multiplier);
    const ratio = new Decimal(Constants.T.amp_per_as[config.skillLevels.T]);
    return additionalAS.times(ratio);
}

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        baseSkillAmp: status.baseSkillAmp.add(additionalAmp(status, config)),
        attackSpeed: {
            base: new Decimal(Constants.T.attack_speed),
            multiplier: status.attackSpeed.multiplier,
            calculated: new Decimal(Constants.T.attack_speed)
        },
        basicAttackRange: status.basicAttackRange.add(Constants.T.additional_attack_range)
    };
}