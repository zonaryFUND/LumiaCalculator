import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import { SubjectConfig } from "components/subject/use-subject-config";
import Decimal from "decimal.js";

export function additionalAmp(status: StatusProps): Decimal {
    return status.cooldownReduction.times(Constants.T.cooldown_conversion);
}

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        baseSkillAmp: status.baseSkillAmp.add(additionalAmp(status))
    };
}