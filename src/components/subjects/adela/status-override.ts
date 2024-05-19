import Constants from "./constants.json";
import Decimal from "decimal.js";import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusOverrideFunc } from "../status-override";
import { StatusBeforeCalculation } from "app-types/subject-dynamic/status/type";
;

export function additionalAmp(status: StatusBeforeCalculation, config: SubjectConfig): Decimal {
    const ratio = (status.attackSpeed.equipment?.ratio ?? new Decimal(0)).add(status.attackSpeed.perMastery?.ratio?.times(config.weaponMastery) ?? 0)
    const value = status.attackSpeed.base!.add(status.attackSpeed.equipment?.constant ?? 0).addPercent(ratio)
    const additionalAS = value?.sub(Constants.T.attack_speed).clamp(0, 10000);
    return additionalAS.times(Constants.T.amp_per_as[config.skillLevels.T] * 100) ?? new Decimal(0);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.adela.passive-amp",
            value: additionalAmp(status, config).round()
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
    basicAttackRange: {
        ...status.basicAttackRange,
        overrideAdditional: {
            nameKey: "subject.adela.passive-range",
            value: new Decimal(Constants.T.additional_attack_range)
        }
    }
})

export default f;
