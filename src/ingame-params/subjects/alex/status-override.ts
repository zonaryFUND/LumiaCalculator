import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import Decimal from "decimal.js";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";

const f: StatusOverrideFunc = (status, config) => {
    const range = weaponRange(config);

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
            overrideAdditional: range == "range" ? undefined : {
                nameKey: "subject.alex.passive-defense",
                value: new Decimal(Constants.T.defense[config.skillLevels.T])
            }
        }
    };
}

export default f;