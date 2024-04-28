import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import { SubjectConfig } from "components/subject/use-subject-config";
import Decimal from "decimal.js";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        basicAttackRange: new Decimal(Constants.common.basic_attack_range)
    };
}