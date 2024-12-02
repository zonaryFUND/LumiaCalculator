import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1077300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.slow.duration,
        1: RatioPercent(Constants.W.slow.effect),
        2: Constants.W.damage.base,
        3: RatioPercent(Constants.W.damage.amp),
        4: Constants.W.enhanced_damage.base,
        5: RatioPercent(Constants.W.enhanced_damage.amp),
        20: Constants.W.damage,
        21: Constants.W.enhanced_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/YuMinWindFieldSkillDamage", values: Constants.W.enhanced_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
