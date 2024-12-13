import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import Decimal from "decimal.js";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

export function AdditionalMaxHP(config: SubjectConfig): Decimal {
    return new Decimal(config.stack * Constants.T.max_hp[config.skillLevels.T])
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    maxHp: AddComponent(status.maxHp,
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.xiukai.passive-maxhp",
            value: {
                type: "constant",
                value: AdditionalMaxHP(config)
            }
        }
    )
});

export default f;