import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";
import * as stack from "./stack";

const f: SubjectPerpetualStatus = (config) => ({
    attackSpeed: config.stack > 0 ? [{
        origin: "perpetual_status",
        calculationType: "mul",
        intlID: "T",
        value: {
            type: "constant",
            value: Constants.T.attack_speed[config.skillLevels.T] * config.stack + (config.stack == stack.MaxStack ? Constants.T.max_attack_speed : 0)
        }
    }] : undefined,
    skillAmp: config.stack == stack.MaxStack ? [{
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "T",
        value: {
            type: "constant",
            value: Constants.T.max_skill_amp
        }
    }] : undefined
});

export default f;
