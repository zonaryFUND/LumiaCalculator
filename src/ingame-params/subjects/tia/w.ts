import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const [y, r, b] = [1048500, 1048510, 1048520];
export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({}),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Cooldown_Yellow", values: Constants.W.y },
            { labelIntlID: "ToolTipType/Cooldown_Red", values: Constants.W.r },
            { labelIntlID: "ToolTipType/Cooldown_Blue", values: Constants.W.b }
        ]
    })
}
