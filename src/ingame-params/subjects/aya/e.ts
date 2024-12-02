import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1002400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: RatioPercent(Constants.E.cooldown_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/AyaActive3", values: Constants.E.cooldown_reduction, percent: true},
        ]  
    })
}
