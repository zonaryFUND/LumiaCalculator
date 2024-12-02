import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1047400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.E.reuse,
        1: Constants.E.airborne,
        2: Constants.E.damage.base,
        3: RatioPercent(Constants.E.damage.amp),
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
