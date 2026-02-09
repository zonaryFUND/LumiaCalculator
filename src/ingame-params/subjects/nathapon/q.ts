import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1034200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        const base = {
            4: Constants.T.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.Q.damage.base,
                7: RatioPercent(Constants.Q.damage.amp)
            }
        } else {
            return {
                ...base,
                2: Constants.Q.damage,
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown }
        ]
    })
}
