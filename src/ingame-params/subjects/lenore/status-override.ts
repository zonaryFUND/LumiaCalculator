import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import { SubjectConfig } from "app-types/subject-dynamic/config";
import { AddComponentCooldown } from "app-types/subject-dynamic/status/value/type";

export const accelerando = (config: SubjectConfig) => {
    return config.stack * Constants.T.stack_conversion;
}

const f: StatusOverrideFunc = (status, config) => {
    const acc = accelerando(config);
    const rcdr = Math.min((acc - Constants.T.max_cdr) / Constants.T.cdr_per_accelerando * Constants.T.r_cdr_conversion, Constants.T.max_rcdr);

    const cooldownReduction = AddComponentCooldown({prev: status.cooldownReduction}, {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "accelerando",
            value: {
                type: "constant",
                value: Math.min(acc * Constants.T.cdr_per_accelerando, Constants.T.max_cdr)
            }
        })

    return {
        ...status,
        cooldownReduction,
        ultCooldownReduction: AddComponentCooldown({prev: status.ultCooldownReduction, base: cooldownReduction}, rcdr == 0 ? undefined : {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "accelerando",
            value: {
                type: "constant",
                value: rcdr
            }
        })
    }
};

export default f;
