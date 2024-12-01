import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1060200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    charge: Constants.Q.charge,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.Q.damage.base,
                1: Constants.Q.spada_damage.base,
                2: Constants.Q.spada_blast_damage.base,
                3: Constants.Q.spada_range,
                5: RatioPercent(Constants.Q.damage.amp),
                7: RatioPercent(Constants.Q.spada_damage.amp),
                9: RatioPercent(Constants.Q.spada_blast_damage.amp),
                10: RatioPercent(Constants.Q.collect_charge),

            }
        } else {   
            return {
                0: Constants.Q.damage,
                1: Constants.Q.spada_damage,
                2: Constants.Q.spada_blast_damage,
                3: Constants.Q.spada_range,
                4: RatioPercent(Constants.Q.collect_charge),
            }
        }
        
    },
    expansion: () => ({
        tipValues: {
            0: Constants.Q.glass_duration,
            1: Constants.Q.knockback_immune
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/ReinforcedDamage", values: Constants.Q.spada_damage.base},
            {labelIntlID: "ToolTipType/ReinforcedExplosionDamage", values: Constants.Q.spada_blast_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.Q.charge.time}
        ]  
    })
}
