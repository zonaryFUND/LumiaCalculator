import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export function additionalAmp(status: StatusProps): Decimal {
    return status.cooldownReduction.times(Constants.T.cooldown_conversion);
}

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        baseSkillAmp: status.baseSkillAmp.add(additionalAmp(status))
    };
}