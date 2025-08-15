import Constants from "./constants.json";
import { SubjectPerpetualStatus } from "../type";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export function AdditionalMaxHP(config: SubjectConfig): Decimal {
    return new Decimal(config.stack * Constants.T.max_hp[config.skillLevels.T])
}

const f: SubjectPerpetualStatus = (config) => ({
    maxHp: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.xiukai.passive-maxhp",
            value: {
                type: "constant",
                value: AdditionalMaxHP(config)
            }
        }
    ]
})

export default f;