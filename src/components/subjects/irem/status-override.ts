import { StatusProps } from "components/subject/status";
import { SubjectConfig } from "components/subject/use-subject-config";

// NOTE:
// The range of Irem's basic attack is 4.5 in game, but the range of other test subjects with Throw weapons is 5.7.
// There is a contradiction between the indicated value and the description.
// In this application, the description of Irem's R skill is adopted for the calculation.
export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        basicAttackRange: status.basicAttackRange.sub(config.equipment.weapon ? 1 : 0)
    };
}