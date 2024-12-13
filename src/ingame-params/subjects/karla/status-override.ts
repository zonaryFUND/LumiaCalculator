import Constants from "./constants.json";
import Decimal from "decimal.js";
import { StatusOverrideFunc } from "../type";
import { AddComponent } from "app-types/subject-dynamic/status/value/type";

const f: StatusOverrideFunc = (status, config) => {
    const threshold = new Decimal(Constants.T.max_attack_speed);

    if (status.attackSpeed.calculatedValue.greaterThan(threshold)) {
        const excess = status.attackSpeed.calculatedValue.sub(threshold).abs();
        return {
            ...status,
            attackSpeed: AddComponent(status.attackSpeed,
                {
                    origin: "perpetual_status",
                    calculationType: "fix",
                    intlID: "subject.karla.passive-attack-speed-max",
                    value: {
                        type: "constant",
                        value: threshold
                    }
                }
            ), 
            skillAmp: AddComponent(status.skillAmp,
                {
                    origin: "perpetual_status",
                    calculationType: "sum",
                    intlID: "subject.karla.passive-amp",
                    value: {
                        type: "constant",
                        value: excess.times(Constants.T.amp_conversion).times(100).round()
                    }
                }
            )
        }
    } else {
        return status;
    }
 }

 export default f;
