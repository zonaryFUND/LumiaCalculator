import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3016000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.duration,
        1: RatioPercent(Constants.damage.additionalAttack),
        2: Constants.dash,
        3: RatioPercent(Constants.damage.amp),
        4: Constants.damage.base,
        20: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true}
        ]  
    })
}
