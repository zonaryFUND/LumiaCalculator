import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { CriticalMultipier, RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084600;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.D.cooldown,
    consumption: {
        type: "vp",
        value: Constants.D.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                1: RatioPercent(Constants.D.damage.attack),
                2: Constants.D.heal.base,
                3: RatioPercent(Constants.D.heal.additionalAttack),
                4: Constants.D.reuse_threshold,
                5: RatioPercent(Constants.D.vp_cost_increase)
            }
        } else {
            return {
                0: Constants.D.damage,
                1: RatioPercent(Constants.D.heal),
                2: Constants.D.reuse_threshold,
                3: RatioPercent(Constants.D.vp_cost_increase)
            }
        }
    },
    expansion: () => ({
        tipValues: {
            0: RatioPercent(Constants.T.animal_heal)
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.D.damage.attack, percent: true}
        ]  
    })
}
