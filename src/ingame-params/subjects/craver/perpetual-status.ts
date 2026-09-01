import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = (config) => ({
    attackSpeed: [
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "T",
            value: {
                type: "constant",
                value: Constants.T.attack_speed[config.skillLevels.T]
            }
        }
    ]
})

export default f;
