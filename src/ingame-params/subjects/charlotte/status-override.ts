import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: AddComponent(status.skillAmp, {
        origin: "perpetual_status",
        calculationType: "sum",
        intlID: "subject.charlotte.r-amp",
        value: {
            type: "constant",
            value: Constants.R.amp[config.skillLevels.R]
        }
    }) 
});

export default f;
