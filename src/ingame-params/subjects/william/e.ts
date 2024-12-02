import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1032400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.duration,
        1: Constants.E.defense
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/DefenseRatio", values: Constants.E.defense},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
