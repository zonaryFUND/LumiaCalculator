import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1061400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.IremE.sp_cost
    },
    cooldown: Constants.IremE.cooldown,
    values: ({ }) => ({}),
    expansion: () => ({
        tipValues: {
            1: Constants.common.fish,
            2: Constants.common.fish_max
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cost", values: Constants.IremE.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.IremE.cooldown},
        ]  
    })
}

