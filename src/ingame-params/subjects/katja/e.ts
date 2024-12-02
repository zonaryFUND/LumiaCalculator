import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1072400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.slow.duration,
        1: RatioPercent(Constants.E.slow.effect),
        2: Constants.E.movement_speed.duration,
        3: RatioPercent(Constants.E.movement_speed.effect),
        4: Constants.E.damage.base,
        5: RatioPercent(Constants.E.damage.attack),
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
