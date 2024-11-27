import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";

/*
const f: StatusOverrideFunc = (status, config, hp) => {
    return {
        ...status,
        skillAmp: {
            ...status.skillAmp,
            overrideAdditional: config.stack == stack.MaxStack ? {
                nameKey: "T",
                value: new Decimal(Constants.T.max_skill_amp)
            } : undefined
        }
    }
};

export default f;

*/
