import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectConfig } from "components/subject/use-subject-config";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    return {
        ...status,
        criticalChance: status.criticalChance.add(status.criticalDamage.times(Constants.T.critical_damage_to_chance)).clamp(0, 100),
        criticalDamage: new Decimal(0)
    };
}