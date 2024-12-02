import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1070400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: Constants.E.duration,
        2: Constants.E.reuse
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
