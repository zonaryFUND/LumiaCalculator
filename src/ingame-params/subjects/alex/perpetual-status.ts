import Constants from "./constants.json";
import { SubjectPerpetualStatus } from "../type";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const f: SubjectPerpetualStatus = (config) => {
    const range = weaponRangeOf(config);

    return {
        attackSpeed: [
            {
                origin: "perpetual_status",
                calculationType: "mul",
                intlID: "subject.alex.e-attack-speed",
                value: {
                    type: "constant",
                    value: Constants.common.e_as[config.skillLevels.E]
                }
            }
        ],
        defense: range == "range" ? [] : [{
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.alex.passive-defense",
            value: {
                type: "constant",
                value: Constants.T.defense[config.skillLevels.T]
            }
        }]
    };
}

export default f;