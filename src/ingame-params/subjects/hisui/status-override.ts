import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";
import Decimal from "decimal.js";

const f: StatusOverrideFunc = (status, config) => {
    const value = status.attackSpeed.multiplier.times(Constants.T.as_conversion);

    return {
        ...status,
        attackPower: AddComponent(status.attackPower,
            {
                origin: "perpetual_status",
                calculationType: "mul",
                intlID: "subject.hisui.passive-attack",
                value: {
                    type: "constant",
                    value
                }
            }
        ),
        attackSpeed: AddComponent(status.attackSpeed,
            {
                origin: "perpetual_status",
                calculationType: "fix",
                intlID: "subject.hisui.passive-as",
                value: {
                    type: "constant",
                    value: new Decimal(Constants.T.base_as + config.level * Constants.T.as_per_level).floor2()
                }
            }
        )
    }
}

export default f;
