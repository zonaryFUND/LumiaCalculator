import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectConfig } from "components/subject/use-subject-config";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    const additionalMaxHP = config.stack * Constants.T.max_hp[config.skillLevels.T];
    return {
        ...status,
        baseMaxHP: status.baseMaxHP.add(additionalMaxHP)
    };
}