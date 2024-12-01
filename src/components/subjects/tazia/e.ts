import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1060400;

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
                1: Constants.E.shield.base,
                2: Constants.E.reuse,
                4: RatioPercent(Constants.E.damage.amp),
                6: RatioPercent(Constants.E.shield.amp),
                7: RatioPercent(Constants.E.glass_additional_damage),
                8: RatioPercent(Constants.E.glass_additional_max),
                9: Constants.E.slow.duration,
                10: RatioPercent(Constants.E.slow.effect),
                11: Constants.E.shield_duration,
            }
        } else {   
            return {
                0: Constants.E.damage,
                1: Constants.E.shield,
                2: Constants.E.reuse,
                3: RatioPercent(Constants.E.glass_additional_damage),
                4: RatioPercent(Constants.E.glass_additional_max),
                5: Constants.E.slow.duration,
                6: RatioPercent(Constants.E.slow.effect),
                7: Constants.E.shield_duration,
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.E.shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
