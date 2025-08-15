import Constants from "./constants.json";
import Decimal from "decimal.js";
import { SubjectPerpetualStatus } from "../type";

const f: SubjectPerpetualStatus = (status, config) => {
    const threshold = new Decimal(Constants.T.max_attack_speed);

    return {
        attackSpeed: [
            {
                origin: "perpetual_status",
                calculationType: "fix",
                intlID: "subject.karla.passive-attack-speed-max",
                value: {
                    type: "constant",
                    value: threshold
                }
            }
        ],
        skillAmp: [
            {
                origin: "perpetual_status",
                calculationType: "sum",
                intlID: "subject.karla.passive-amp",
                value: {
                    type: "status-conversion",
                    func: status => {
                        if (status.attackSpeed.calculatedValue.lessThanOrEqualTo(threshold)) return 0;
                        
                        const excess = status.attackSpeed.calculatedValue.sub(threshold).abs();
                        return excess.times(Constants.T.amp_conversion).times(100).round();
                    }
                }
            } 
        ]
    }
 }

 export default f;
