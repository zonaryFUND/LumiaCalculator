import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";

export const code = 3014000;

export const info: SkillTooltipProps = {
    skillKey: "D",
    cooldown: Constants.cooldown,
    values: ({ showEquation }) => ({
        2: showEquation ? RatioPercent(Constants.damage.additionalAttack) : Constants.damage,
        3: RatioPercent(Constants.damage.targetMaxHP),
        4: RatioPercent(Constants.heal),
        7: RatioPercent(Constants.damage.amp),
        8: Constants.damage.base
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.damage.additionalAttack, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.cooldown.constant}
        ]  
    })
}
