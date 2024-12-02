import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1010400;

export const info: TooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.slow.duration,
        1: Constants.E.damage.base,
        2: RatioPercent(Constants.E.damage.attack),
        4: RatioPercent(Constants.E.slow.effect),
        6: RatioPercent(Constants.E.slow.enhanced_effect),
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/FettedDecreaseMoveRatio", values: Constants.E.slow.enhanced_effect, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
