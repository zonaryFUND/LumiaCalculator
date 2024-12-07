import Constants from "./constants.json";
import { StatusOverrideFunc } from "../type";
import Decimal from "decimal.js";
import { standardCalc } from "app-types/subject-dynamic/status/standard-calculation";

const f: StatusOverrideFunc = (status, config) => {
    const tLevel = config.skillLevels.T;
    const maxHP = standardCalc(status.maxHP, {level: config.level}, 0).calculatedValue;
    const amp = standardCalc(status.skillAmp, {level: config.level, mastery: config.weaponMastery}, 0).calculatedValue;
    const value = new Decimal(Constants.T.reduction.base[tLevel])
        .add(amp.percent(Constants.T.reduction.amp))
        .add(maxHP.percent(Constants.T.reduction.maxHP));

    return {
        ...status,
        preventBasicAttackDamaged: {
            overrideAdditional: {
                nameKey: "subject.garnet.passive-damage-reduction",
                value
            }
        }
    }
};

export default f;
