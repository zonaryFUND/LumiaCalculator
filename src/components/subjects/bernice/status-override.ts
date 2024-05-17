import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        basicAttackRange: new Decimal(Constants.common.basic_attack_range)
    };
}