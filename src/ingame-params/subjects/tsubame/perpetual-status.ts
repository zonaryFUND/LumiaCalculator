import Constants from "./constants";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = () => ({
    attackRange: [
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "subject.tsubame.aa-range",
            value: {
                type: "constant",
                value: Constants.common.range
            }
        }
    ]
});

export default f;
