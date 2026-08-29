import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { adaptiveForceTargetOf } from "core/subject-dynamic/config";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config }) => {
    const attack = config ? adaptiveForceTargetOf(config) == "attackPower" : true;

    return {
        0: Constants.threshold,
        1: Constants.guard_duration,
        2: Constants.shield.base,
        3: Constants.shield.level,
        5: Constants.adaptive_duration,
        9: Constants.heal,
        11: showEquation ? Constants.cooldown : Constants.shield,
        13: showEquation ? Constants.adaptive : Constants.cooldown,
        14: Constants.adaptive * 2,
        15: {intlID: `StatType/${attack ? "AttackPower" : "SkillAmp"}`},
        16: Constants.adaptive * (attack ? 1 : 2)
    }
}

export default values;