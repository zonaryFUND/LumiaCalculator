import { equipmentStatus } from "app-types/equipment";
import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import Decimal from "decimal.js";

const f: StatusOverrideFunc = (status, config) => {
    const equipmentType = config.equipment.weapon ? equipmentStatus(config.equipment.weapon).type : null;
    const isRange = equipmentType == "pistol" || equipmentType == "shuriken";

    return {
        ...status,
        attackSpeed: {
            ...status.attackSpeed,
            overrideAdditional: {
                nameKey: "subject.alex.e-attack-speed",
                ratio: new Decimal(Constants.common.e_as[config.skillLevels.E])
            }
        },
        defense: {
            ...status.defense,
            overrideAdditional: isRange ? undefined : {
                nameKey: "subject.alex.passive-defense",
                value: new Decimal(Constants.T.defense[config.skillLevels.T])
            }
        }
    };
}

export default f;