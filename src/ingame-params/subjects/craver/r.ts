import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1089500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.R.airborne,
        1: Constants.R.damage,
        2: RatioPercent(Constants.R.heal),
        20: Constants.R.damage.base,
        21: RatioPercent(Constants.R.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/CraverRDamage", values: Constants.R.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown }
        ]  
    })
}
