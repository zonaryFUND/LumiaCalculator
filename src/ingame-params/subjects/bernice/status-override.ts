import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { BaseBasicAttackRange } from "app-types/subject-dynamic/status/standard-values";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const range = new Decimal(Constants.common.basic_attack_range);

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackRange: AddComponent(status.attackRange, config.equipment.Weapon != null ? {
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "T",
        value: {
            type: "constant",
            value: range.sub(status.attackRange.calculatedValue)
        }
    } : undefined)
})

export default f;