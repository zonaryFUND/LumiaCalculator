import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectPerpetualStatus } from "../type";

export function AdditionalAttack(attackSpeedMultiplier: Decimal): Decimal {
    return attackSpeedMultiplier.times(Constants.T.as_conversion)
}

const f: SubjectPerpetualStatus = (config) => ({
    attackPower: [
        {
            origin: "perpetual_status",
            calculationType: "mul",
            intlID: "subject.hisui.passive-attack",
            value: {
                type: "status-conversion",
                func: status => AdditionalAttack(status.attackSpeed.multiplier)
            }
        }
    ],
    attackSpeed: [
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "subject.hisui.passive-as",
            value: {
                type: "constant",
                value: new Decimal(Constants.T.base_as + config.level * Constants.T.as_per_level).floor2()
            }
        }
    ]
})

export default f;
