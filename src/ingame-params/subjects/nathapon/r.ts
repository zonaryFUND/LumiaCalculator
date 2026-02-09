import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 1034500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.cast,
        1: Constants.R.statis,
        2: Constants.T.max_stack
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SkillRange", values: Constants.R.range },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
