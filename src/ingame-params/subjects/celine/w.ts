import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1043300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.W.q_cooldown_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.W.q_cooldown_reduction, percent: true}
        ]  
    })
}
