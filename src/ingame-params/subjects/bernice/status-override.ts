import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { BaseBasicAttackRange } from "app-types/subject-dynamic/status/standard-values";

const range = new Decimal(Constants.common.basic_attack_range);

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    basicAttackRange: {
        ...status.basicAttackRange,
        equipment: {
            constant: range.sub(BaseBasicAttackRange)
        },
        calculatedValue: range
    }
})

export default f;