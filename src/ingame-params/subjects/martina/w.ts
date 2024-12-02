import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.duration,
        1: Constants.W.damage.base,
        2: RatioPercent(Constants.W.damage.attack),
        3: Constants.W.slow.duration,
        4: RatioPercent(Constants.W.slow.effect),
        5: Constants.W.charge.max,
        14: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.W.charge.time},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
