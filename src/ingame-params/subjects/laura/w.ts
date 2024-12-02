import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1047300;

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
        2: Constants.W.target_duration,
        3: Constants.W.damage.base,
        4: RatioPercent(Constants.W.damage.amp),
        5: Constants.W.heal.base,
        6: RatioPercent(Constants.W.heal.amp),
        20: Constants.W.damage,
        21: Constants.W.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.heal.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
