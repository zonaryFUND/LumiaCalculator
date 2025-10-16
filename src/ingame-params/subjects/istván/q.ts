import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1080200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        return {
            0: Constants.Q.slow.duration,
            1: RatioPercent(Constants.Q.slow.effect),
            2: RatioPercent(Constants.Q.enhance_target_hp_threshold),
            3: Constants.Q.damage.base,
            4: RatioPercent(Constants.Q.damage.attack),
            5: Constants.Q.variable_damage.base,
            6: RatioPercent(Constants.Q.variable_damage.attack),
            7: Constants.Q.enhanced_damage.base,
            8: RatioPercent(Constants.Q.enhanced_damage.attack),
            20: Constants.Q.damage,
            21: Constants.Q.variable_damage,
            22: Constants.Q.enhanced_damage
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/IstvanCloneDamage", values: Constants.Q.variable_damage.base},
            {labelIntlID: "ToolTipType/IstvanCloneReinforceDamage", values: Constants.Q.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
