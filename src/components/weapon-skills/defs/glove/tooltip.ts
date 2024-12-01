import { RatioPercent } from "components/tooltip/skill/valueratio-to-string";
import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";

export const code = 3001000;

export const info: TooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ }): TooltipValues => ({
        2: RatioPercent(Constants.damage.additionalAttack),
        3: RatioPercent(Constants.additional_damage),
        4: Constants.true_damage,
        5: RatioPercent(Constants.damage.amp),
        6: Constants.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.additional_damage, percent: true},
            {labelIntlID: "ToolTipType/TrueDamage", values: Constants.true_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
