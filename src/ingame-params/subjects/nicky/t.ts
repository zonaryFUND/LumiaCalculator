import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1033100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ }) => ({
        0: RatioPercent(Constants.T.hp_conversion),
        1: Constants.T.enraged_duration,
        2: RatioPercent(Constants.T.attack_speed),
        3: Constants.T.damage,
        10: Constants.T.damage.base,
        12: RatioPercent(Constants.T.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TargetDamage", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/OutRangeDamge", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.T.attack_speed},
        ]  
    })
}
