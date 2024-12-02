import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3004000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.damage.base,
        1: RatioPercent(Constants.damage.additionalAttack),
        2: RatioPercent(Constants.damage.amp),
        3: Constants.slow.duration,
        4: RatioPercent(Constants.slow.effect),
        20: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.slow.effect, percent: true}
        ]  
    })
}
