import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import Decimal from "decimal.js";
import useRange from "app-types/subject-dynamic/config/use-range";

const f: StatusOverrideFunc = (status, config) => {
    const range = useRange(config);

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