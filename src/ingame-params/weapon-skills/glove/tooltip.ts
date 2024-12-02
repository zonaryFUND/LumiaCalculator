import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";

export const code = 3001000;

export const info: SkillTooltipProps = {
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
