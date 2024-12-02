import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1026300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.damage.base : Constants.W.damage,
        1: showEquation ? RatioPercent(Constants.W.damage.amp) : Constants.W.movement_speed.duration,
        2: showEquation ? Constants.W.movement_speed.duration : RatioPercent(Constants.W.movement_speed.effect),
        3: showEquation ? RatioPercent(Constants.W.movement_speed.effect) : Constants.W.movement_speed.duration,
        4: Constants.W.movement_speed.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
