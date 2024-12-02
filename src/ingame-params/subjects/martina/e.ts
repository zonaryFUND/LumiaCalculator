import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1057400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.E.movement_speed),
        3: Constants.E.slow.duration,
        4: RatioPercent(Constants.E.slow.effect) 
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
