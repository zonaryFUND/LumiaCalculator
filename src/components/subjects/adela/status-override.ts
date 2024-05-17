import Constants from "./constants.json";
import Decimal from "decimal.js";import { SubjectConfig } from "app-types/subject-dynamic/config";
import { StatusOverrideFunc } from "../status-override";
import { Status } from "app-types/subject-dynamic/status/type";
;

export function additionalAmp(status: Status, config: SubjectConfig): Decimal {
    const additionalAS = status.attackSpeed.base.times(status.attackSpeed.multiplier);
    const ratio = new Decimal(Constants.T.amp_per_as[config.skillLevels.T]);
    return additionalAS.times(ratio);
}

const f: StatusOverrideFunc = (status, config) => ({
    ...status,
    skillAmp: {
        ...status.skillAmp,
        overrideAdditional: {
            nameKey: "subject.adela.passive-amp",
            value: additionalAmp(status, config)
        }
    },
    attackSpeed: {
        ...status.attackSpeed,
        base: new Decimal(Constants.T.attack_speed),
        value: new Decimal(Constants.T.attack_speed)
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
