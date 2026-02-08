import { SubjectPerpetualStatus } from "../type";
import Constants from "./constants";

const f: SubjectPerpetualStatus = (config) => ({
    tenacity: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "T",
            value: {
                type: "constant",
                value: Constants.T.tenacity[config.skillLevels.T]
            }
        }
    ]
});

export default f;
