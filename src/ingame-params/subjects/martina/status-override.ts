import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => {
    const value = status.attackSpeed.multiplier.dividedBy(Constants.T.attack_speed_conversion.from).floor().times(Constants.T.attack_speed_conversion.to);

    return {
        ...status,
        attackPower: AddComponent(status.attackPower,
            {
                origin: "perpetual_status",
                calculationType: "mul",
                intlID: "subject.martina.passive-attack",
                value: {
                    type: "constant",
                    value
                }
            }
        )
    }
}

export default f;
