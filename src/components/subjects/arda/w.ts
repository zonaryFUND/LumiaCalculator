import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1066300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.W.damage.base : Constants.W.damage,
        1: Constants.W.slow.duration,
        2: RatioPercent(Constants.W.slow.effect),
        3: Constants.W.duration,
        4: showEquation ? Constants.W.vanish_damage.base : Constants.W.vanish_damage,
        5: showEquation ? RatioPercent(Constants.W.damage.amp) : Constants.W.stun,
        6: RatioPercent(Constants.W.vanish_damage.amp),
        7: Constants.W.stun
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.vanish_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
