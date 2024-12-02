import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1027400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.RangeE.sp_cost
    },
    cooldown: Constants.RangeE.cooldown,
    values: ({ }) => ({
        0: Constants.RangeE.damage.base,
        1: RatioPercent(Constants.RangeE.damage.attack),
        2: Constants.RangeE.slow.duration,
        3: RatioPercent(Constants.RangeE.slow.effect),
        4: RatioPercent(Constants.common.e_as),
        6: Constants.RangeE.weapon_swap,
        7: 6,
        20: Constants.RangeW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RangeW.damage.base},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.common.e_as, percent: true},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.RangeE.slow.effect, percent: true},
        ]  
    })
}
