import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1028100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.T.aoe_range,
                1: Constants.T.damage.base,
                2: RatioPercent(Constants.T.damage.amp),
                4: RatioPercent(Constants.T.heal),
                5: Constants.T.cooldown_reduction,
                6: Constants.T.max_stack,
                7: RatioPercent(Constants.T.attack_speed),
                8: Constants.T.aoe_damage.base,
                9: RatioPercent(Constants.T.aoe_damage.amp),
                11: RatioPercent(Constants.T.damage.attack),
                12: RatioPercent(Constants.T.aoe_damage.attack),
            }
        } else {   
            return {
                0: Constants.T.aoe_range,
                1: Constants.T.damage,
                2: Constants.T.aoe_damage,
                3: RatioPercent(Constants.T.heal),
                4: Constants.T.max_stack,
                5: RatioPercent(Constants.T.attack_speed),
                6: Constants.T.cooldown_reduction
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/OutRangeDamge", values: Constants.T.aoe_damage.base}
        ]  
    })
}
