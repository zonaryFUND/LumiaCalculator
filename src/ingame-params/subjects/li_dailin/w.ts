import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1010300;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.cast,
        1: RatioPercent(Constants.W.basic_attack_amp),
        2: RatioPercent(Constants.W.basic_attack_amp * 100),
        3: Constants.W.cooldown_reduction,
        20: RatioPercent(Constants.W.damage_reduction)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/DecreaseReceiveDamageRatio", values: Constants.W.damage_reduction, percent: true}
        ]  
    })
}
