import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        6: Constants.R.supression,
        7: Constants.R.heal.base,
        12: RatioPercent(Constants.R.heal.amp),
        13: RatioPercent(Constants.R.heal.targetLostHP),
        21: Constants.R.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]
    })
}
