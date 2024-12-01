import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1018400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base,
                2: Constants.E.slow.duration,
                3: RatioPercent(Constants.E.slow.effect),
                4: RatioPercent(Constants.E.damage.amp),
                5: Constants.E.duration,
                6: Constants.E.cooldown_reduction,
                7: RatioPercent(Constants.E.damage_increase),
                8: RatioPercent(Constants.E.kill_cooldown_reduction)
            }
        } else {   
            return {
                0: Constants.E.damage,
                1: Constants.E.slow.duration,
                2: RatioPercent(Constants.E.slow.effect),
                3: Constants.E.duration,
                4: Constants.E.cooldown_reduction,
                5: RatioPercent(Constants.E.damage_increase),
                6: RatioPercent(Constants.E.kill_cooldown_reduction)
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true}
        ]  
    })
}
