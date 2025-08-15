import Constants from "./constants.json";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = (config) => ({
    attackRange: config.equipment.Weapon != null ? [{
        origin: "perpetual_status",
        calculationType: "fix",
        intlID: "T",
        value: {
            type: "constant",
            value: Constants.common.basic_attack_range
        }
    }] : []
})

export default f;