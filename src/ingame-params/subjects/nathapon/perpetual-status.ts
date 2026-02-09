import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = () => ({
    attackSpeed: [
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "subject.nathapon.passive-attack-speed",
            value: {
                type: "constant",
                value: Constants.common.attackSpeed
            }
        }
    ]
});

export default f;
