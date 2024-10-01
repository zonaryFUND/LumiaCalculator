import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackSpeed: {
        ...status.attackSpeed,
        overrideFix: {
            nameKey: "subject.nathapon.passive-attack-speed",
            value: new Decimal(Constants.common.attackSpeed)
        },
        calculatedValue: new Decimal(Constants.common.attackSpeed)
    }
});

export default f;
