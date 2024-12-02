import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.charlotte.r-amp",
            value: new Decimal(Constants.R.amp[config.skillLevels.R])
        }
    }
});

export default f;
