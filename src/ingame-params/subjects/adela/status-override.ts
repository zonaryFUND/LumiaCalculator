import Constants from "./constants.json";
import Decimal from "decimal.js";import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusOverrideFunc } from "../type";
import { AdditionalStatusValue, StatusValue } from "app-types/subject-dynamic/status/type";
;

export function additionalAmp(attackSpeed: StatusValue & AdditionalStatusValue, config: SubjectConfig): Decimal {
    const ratio = (attackSpeed.equipment?.ratio ?? new Decimal(0)).add(attackSpeed.perMastery?.ratio?.times(config.weaponMastery) ?? 0)
    const value = attackSpeed.base!.add(attackSpeed.equipment?.constant ?? 0).addPercent(ratio)
    const additionalAS = value?.sub(Constants.T.attack_speed).clamp(0, 10000);
    return additionalAS.times(Constants.T.amp_per_as[config.skillLevels.T] * 100) ?? new Decimal(0);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.adela.passive-amp",
            value: additionalAmp(status.attackSpeed, config).round()
        }
    },
    attackSpeed: {
        ...status.attackSpeed,
        overrideFix: {
            nameKey: "subject.adela.passive-attack-speed",
            value: new Decimal(Constants.T.attack_speed)
        },
        calculatedValue: new Decimal(Constants.T.attack_speed)
    },
    attackRange: {
        ...status.attackRange,
        overrideAdditional: {
            nameKey: "subject.adela.passive-range",
            value: new Decimal(Constants.T.additional_attack_range)
        }
    }
})

export default f;
