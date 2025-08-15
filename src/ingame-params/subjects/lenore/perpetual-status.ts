import Constants from "./constants.json";
import { SubjectPerpetualStatus } from "../type";
import { SubjectConfig } from "app-types/subject-dynamic/config";

export const accelerando = (config: SubjectConfig) => {
    return config.stack * Constants.T.stack_conversion;
}

const f: SubjectPerpetualStatus = (config) => {
    const acc = accelerando(config);
    const rcdr = Math.min((acc - Constants.T.max_cdr) / Constants.T.cdr_per_accelerando * Constants.T.r_cdr_conversion, Constants.T.max_rcdr);

    return {
        cooldownReduction: [
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "accelerando",
                value: {
                    type: "constant",
                    value: Math.min(acc * Constants.T.cdr_per_accelerando, Constants.T.max_cdr)
                }
            }   
        ],
        ultCooldownReduction: [
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "accelerando",
                value: {
                    type: "constant",
                    value: rcdr
                }
            }
        ]
    }
};

export default f;
