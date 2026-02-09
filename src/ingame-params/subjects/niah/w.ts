import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1081300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.amp),
                2: Constants.W.pull_damage,
                3: Constants.W.duration
            }
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.pull_damage,
                2: Constants.W.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base },
            { labelIntlID: "ToolTipType/TrueDamage", values: Constants.W.pull_damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown }
        ]
    })
}
