import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1082100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.max_stack,
                1: Constants.T.damage.base,
                2: RatioPercent(Constants.T.damage.attack),
                3: Constants.T.qe_cooldown_reduction,
                4: Constants.T.heal.base,
                5: RatioPercent(Constants.T.heal.attack),
                6: RatioPercent(Constants.T.animal_heal)
            }
        } else {
            return {
                0: Constants.T.max_stack,
                1: Constants.T.damage,
                2: Constants.T.qe_cooldown_reduction,
                3: Constants.T.heal,
                4: RatioPercent(Constants.T.animal_heal)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base },
            { labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.attack, percent: true },
            { labelIntlID: "ToolTipType/Heal", values: Constants.T.heal.base }
        ]
    })
}
