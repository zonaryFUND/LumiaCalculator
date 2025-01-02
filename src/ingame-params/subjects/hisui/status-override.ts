import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";
import Decimal from "decimal.js";

export function AdditionalAttack(attackSpeedMultiplier: Decimal): Decimal {
    return attackSpeedMultiplier.times(Constants.T.as_conversion)
}

const f: StatusOverrideFunc = (status, config) => {
    return {
        ...status,
        attackPower: AddComponent(status.attackPower,
            {
                origin: "perpetual_status",
                calculationType: "mul",
                intlID: "subject.hisui.passive-attack",
                value: {
                    type: "constant",
                    value: AdditionalAttack(status.attackSpeed.multiplier)
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
