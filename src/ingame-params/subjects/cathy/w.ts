import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1023300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.inner_damage.base : Constants.W.inner_damage,
        1: Constants.W.outer_damage,
        2: Constants.W.slow.duration,
        3: RatioPercent(Constants.W.slow.effect),
        4: Constants.W.slow.duration,
        5: Constants.W.outer_damage.base,
        8: RatioPercent(Constants.W.inner_damage.amp),
        9: RatioPercent(Constants.W.outer_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.inner_damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.W.outer_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
