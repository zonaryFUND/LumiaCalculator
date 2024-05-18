import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import Decimal from "decimal.js";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    maxHP: {
        ...status.maxHP,
        overrideAdditional: {
            nameKey: "subject.xiukai.passive-maxhp",
            value: new Decimal(config.stack * Constants.T.max_hp[config.skillLevels.T])
        }
    }
});

export default f;