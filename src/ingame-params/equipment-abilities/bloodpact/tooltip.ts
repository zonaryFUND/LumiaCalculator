import Constants from "./constants.json";
import { ItemSkillTooltipValuesHook } from "../item-skill";
import { useValueContextOptional } from "components/tooltip/value-context";
import { AdaptiveTarget } from "app-types/subject-dynamic/config/extract-weapon-type-id";
import { useIntl } from "react-intl";

const values: ItemSkillTooltipValuesHook = () => {
    const intl = useIntl();
    const { config, showEquation } = useValueContextOptional();
    const attack = config ? AdaptiveTarget(config) == "attackPower" : true;

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
        15: intl.formatMessage({id: `StatType/${attack ? "AttackPower" : "SkillAmp"}`}),
        16: Constants.adaptive * (attack ? 1 : 2)
    }
}

export default values;