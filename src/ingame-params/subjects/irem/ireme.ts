import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1061400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.IremE.cooldown,
    values: ({ }) => ({}),
    expansion: () => ({
        tipValues: {
            1: Constants.common.fish,
            2: Constants.common.fish_max
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.IremE.cooldown},
        ]  
    })
}

