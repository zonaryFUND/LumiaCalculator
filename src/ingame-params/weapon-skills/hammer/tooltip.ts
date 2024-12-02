import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "@app/ingame-params/tooltip-props";

export const code = 3013000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        0: Constants.damage.base,
        2: Constants.defense_decline.duration,
        3: RatioPercent(Constants.defense_decline.effect),
        4: RatioPercent(Constants.damage.additionalAttack),
        5: RatioPercent(Constants.damage.amp),
        6: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.defense_decline.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true}
        ]  
    })
}
