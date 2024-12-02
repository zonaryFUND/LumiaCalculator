import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1027300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.RangeW.sp_cost
    },
    cooldown: Constants.RangeW.cooldown,
    values: ({ }) => ({
        0: Constants.RangeW.damage.base,
        1: RatioPercent(Constants.RangeW.damage.attack),
        2: Constants.RangeW.duration,
        3: Constants.RangeW.duration,
        4: Constants.RangeW.range,
        20: Constants.RangeW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RangeW.damage.base},
            {labelIntlID: "ToolTipType/Time", values: Constants.RangeW.duration},
            {labelIntlID: "ToolTipType/Cost", values: Constants.RangeW.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.RangeW.cooldown},
        ]  
    })
}
