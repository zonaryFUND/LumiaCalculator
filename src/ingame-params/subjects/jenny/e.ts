import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1038400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.damage.base,
        1: RatioPercent(Constants.E.damage.amp),
        2: Constants.E.count,
        3: Constants.E.cooldown_reduction,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown.constant},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.E.damage.base},
        ]  
    })
}
