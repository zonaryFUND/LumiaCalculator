import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import { SubjectConfig } from "components/subject/use-subject-config";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        basicAttackRange: status.basicAttackRange.add(Constants.common.basic_attack_range)
    };
}