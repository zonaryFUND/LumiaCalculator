import Constants from "./constants";
import Decimal from "decimal.js";
import { SubjectPerpetualStatus } from "../type";

export function AdditionalAmp(cooldown: Decimal): Decimal {
    return cooldown.times(Constants.T.cooldown_conversion);
}

const f: SubjectPerpetualStatus = () => ({
    skillAmp: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.tia.passive-amp",
            value: {
                type: "status-conversion",
                func: status => AdditionalAmp(status.cooldownReduction.rawHasteValue)
            }
        }
    ]
});

export default f;
