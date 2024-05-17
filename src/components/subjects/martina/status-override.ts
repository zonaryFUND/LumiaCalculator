import { StatusProps } from "components/subject/status";
import Constants from "./constants.json";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    const count = status.attackSpeed.multiplier.dividedBy(Constants.T.attack_speed_conversion.from).floor();

    return {
        ...status,
        attackPowerRatio: count.times(Constants.T.attack_speed_conversion.to)
    };
}
