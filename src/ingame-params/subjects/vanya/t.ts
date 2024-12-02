import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1064100;

export const info: TooltipProps = {
    skillKey: "T",
    cooldown: Constants.T.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.T.basic_attack_damage,
        1: Constants.T.duration,
        2: Constants.T.damage_over_time,
        3: Constants.T.shield,
        4: showEquation ? Constants.T.shield_decline.base : Constants.T.shield_decline,
        5: Constants.T.max_shield,
        10: Constants.T.basic_attack_damage.base,
        11: RatioPercent(Constants.T.basic_attack_damage.amp),
        12: Constants.T.damage_over_time.base,
        13: RatioPercent(Constants.T.damage_over_time.amp),
        14: Constants.T.shield.base,
        15: RatioPercent(Constants.T.shield.amp),
        16: Constants.T.max_shield.base,
        17: RatioPercent(Constants.T.max_shield.amp),
        18: Constants.T.shield_decline.level
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/VanyaDaydreamDamage", values: Constants.T.basic_attack_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.T.cooldown.constant},
            {labelIntlID: "ToolTipType/VanyaButterflyDot", values: Constants.T.damage_over_time.base},
            {labelIntlID: "ToolTipType/VanyaButterflyShieldGain", values: Constants.T.shield.base},
            {labelIntlID: "ToolTipType/VanyaButterflyShieldMax", values: Constants.T.max_shield.base}
        ]  
    })
}
