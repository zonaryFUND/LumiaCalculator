import Constants from "./constants";
import Decimal from "decimal.js";import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusValue } from "app-types/subject-dynamic/status/value-component/type";
import { SubjectPerpetualStatus } from "../type";
;

export function AdditionalAmp(attackSpeed: StatusValue, config: SubjectConfig): Decimal {
    const calculatedAS = attackSpeed.sum.addPercent(attackSpeed.multiplier);
    const additionalAS = Decimal.max(0, calculatedAS.sub(Constants.T.attack_speed));
    return additionalAS.times(Constants.T.amp_per_as[config.skillLevels.T] * 100) ?? new Decimal(0);
}

const f: SubjectPerpetualStatus = (config) => ({
    skillAmp: config.equipment.Weapon != null ? [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.adela.passive-amp",
            value: {
                type: "status-conversion",
                func: status => AdditionalAmp(status.attackSpeed, config)
            }
        } 
    ] : undefined,
    attackSpeed: [
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "subject.adela.passive-attack-speed",
            value: {
                type: "constant",
                value: Constants.T.attack_speed
            }
        }
    ],
    attackRange: [
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.adela.passive-range",
            value: {
                type: "constant",
                value: Constants.T.additional_attack_range
            }
        }
    ]
})

export default f;
