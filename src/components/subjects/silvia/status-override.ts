import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../status-override";
import * as stack from "./stack";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    attackSpeed: {
        ...status.attackSpeed,
        overrideAdditional: config.stack > 0 ? {
            nameKey: "T",
            ratio: new Decimal(Constants.T.attack_speed[config.skillLevels.T]).times(config.stack)
                .add(config.stack == stack.MaxStack ? Constants.T.max_attack_speed : 0)
        } : undefined
    },
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: config.stack == stack.MaxStack ? {
            nameKey: "T",
            value: new Decimal(Constants.T.max_skill_amp)
        } : undefined
    }
});

export default f;
