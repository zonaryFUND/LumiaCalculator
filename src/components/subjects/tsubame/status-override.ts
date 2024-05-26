import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";

const range = new Decimal(Constants.common.range);

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    basicAttackRange: {
        ...status.basicAttackRange,
        calculatedValue: range,
        overrideFix: {
            nameKey: "subject.tsubame.range",
            value: range
        }
    }
});

export default f;