import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1035300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        1: RatioPercent(Constants.W.damage.additionalAttack),
        2: Constants.W.enhanced_damage.base,
        3: RatioPercent(Constants.W.enhanced_damage.additionalAttack),
        4: Constants.W.enhanced_stun,
        5: Constants.W.stun,
        6: RatioPercent(Constants.W.damage.amp),
        7: RatioPercent(Constants.W.enhanced_damage.amp),
        8: Constants.W.damage,
        9: Constants.W.enhanced_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.W.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
