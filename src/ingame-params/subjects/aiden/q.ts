import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1046200;

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        1: RatioPercent(Constants.Q.damage.attack),
        2: 1,
        3: Constants.Q.cooldown_reduction,
        4: Constants.Q.range_damage.base,
        5: RatioPercent(Constants.Q.range_damage.attack),
        6: Constants.Q.slow.duration,
        7: RatioPercent(Constants.Q.slow.effect),
        9: Constants.Q.range_cooldown_reduction,
        20: Constants.Q.damage,
        21: Constants.Q.range_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SwordDamage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/VoltGunDamage", values: Constants.Q.range_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown.constant},
            {labelIntlID: "ToolTipType/SwordCost", values: Constants.Q.range_sp_cost}
        ]  
    })
}
