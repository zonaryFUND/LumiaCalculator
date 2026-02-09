import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1070400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: Constants.E.duration,
        2: Constants.E.reuse
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
