import Constants from "./constants.json";
import { StatusOverrideFunc } from "../status-override";
import Decimal from "decimal.js";

const f: StatusOverrideFunc = (status, config) => {
    return {
        ...status,
        tenacity: {
            ...status.tenacity,
            overrideAdditional: {
                nameKey: "T",
                value: new Decimal(Constants.T.tenacity[config.skillLevels.T])
            }
        }
    }
};

export default f;
