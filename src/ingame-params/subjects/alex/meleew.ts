import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1027700;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.MeleeW.sp_cost
    },
    cooldown: Constants.MeleeW.cooldown,
    values: ({ }) => ({
        0: Constants.MeleeW.damage.base,
        1: RatioPercent(Constants.MeleeW.damage.attack),
        20: Constants.MeleeW.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.MeleeW.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.MeleeW.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.MeleeW.cooldown},
        ]  
    })
}
