import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";

const range = new Decimal(Constants.common.basic_attack_range);

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    basicAttackRange: {
        ...status.basicAttackRange,
        overrideFix: {
            nameKey: "subject.bernice.passive-attack-range",
            value: range
        },
        calculatedValue: range
    }
})

export default f;