import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = (config) => ({
    skillAmp: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.charlotte.r-amp",
            value: {
                type: "constant",
                value: Constants.R.amp[config.skillLevels.R]
            }
        }
    ] 
});

export default f;
