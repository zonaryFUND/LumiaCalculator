import Constants from "./constants.json";
import Decimal from "decimal.js";import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusOverrideFunc } from "../type";
import { AddComponent, StatusValue, ValueBeforeFix } from "app-types/subject-dynamic/status/value/type";
;

export function AdditionalAmp(attackSpeed: StatusValue, config: SubjectConfig): Decimal {
    const valueBeforeFix = ValueBeforeFix(attackSpeed.components, 2);
    const additionalAS = Decimal.max(0, valueBeforeFix.calculated.sub(Constants.T.attack_speed));
    return additionalAS.times(Constants.T.amp_per_as[config.skillLevels.T] * 100) ?? new Decimal(0);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: AddComponent(status.skillAmp, status.attackSpeed.components.findIndex(c => c.origin != "weapon-base") > -1 ?
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.adela.passive-amp",
            value: {
                type: "constant",
                value: AdditionalAmp(status.attackSpeed, config)
            }
        } : undefined
    ),
    attackSpeed: AddComponent(status.attackSpeed,
        {
            origin: "perpetual_status",
            calculationType: "fix",
            intlID: "subject.adela.passive-attack-speed",
            value: {
                type: "constant",
                value: Constants.T.attack_speed
            }
        }
    ),
    attackRange: AddComponent(status.attackRange,
        {
            origin: "perpetual_status",
            calculationType: "sum",
            intlID: "subject.adela.passive-range",
            value: {
                type: "constant",
                value: Constants.T.additional_attack_range
            }
        }
    )
})

export default f;
