import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1088400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            0: Constants.E.taunt
        }

        if (showEquation) {
            return {
                ...base,
                1: Constants.E.damage.base,
                2: RatioPercent(Constants.E.damage.attack)
            }
        } else {
            return {
                ...base,
                1: Constants.E.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/TauntTime", values: Constants.E.taunt},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
