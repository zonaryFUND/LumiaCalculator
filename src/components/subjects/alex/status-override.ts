import { StatusProps } from "components/subject/status";
import { SubjectConfig } from "components/subject/use-subject-config";
import { equipmentStatus } from "@app/entity/equipment";
import Constants from "./constants.json";

export default function(status: StatusProps, config: SubjectConfig): StatusProps {
    const equipmentType = config.equipment.weapon ? equipmentStatus(config.equipment.weapon).type : null;
    const isMelee = equipmentType == "tonfa" || equipmentType == "two-handed_sword"

    const as = Constants.common.e_as[config.skillLevels.E];
    const additional = status.attackSpeed.additional.add(as)
    const def = Constants.T.defense[config.skillLevels.T];
    return {
        ...status,
        attackSpeed: {
            base: status.attackSpeed.base,
            additional,
            calculated: status.attackSpeed.base.times(additional.add(100)).dividedBy(100)
        },
        defense: isMelee ? status.defense.add(def) : status.defense
    };
}