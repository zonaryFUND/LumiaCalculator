import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const f: StatusOverrideFunc = (status, config) => {
    const range = weaponRangeOf(config);

    return {
        ...status,
        attackSpeed: AddComponent(status.attackSpeed,
            {
                origin: "perpetual_status",
                calculationType: "mul",
                intlID: "subject.alex.e-attack-speed",
                value: {
                    type: "constant",
                    value: Constants.common.e_as[config.skillLevels.E]
                }
            }
        ),
        defense: AddComponent(status.defense, range == "range" ? undefined : {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.alex.passive-defense",
            value: {
                type: "constant",
                value: Constants.T.defense[config.skillLevels.T]
            }
        })
    };
}

export default f;