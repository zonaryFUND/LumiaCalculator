import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1062400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.slow.duration,
        1: RatioPercent(Constants.E.slow.effect),
        2: Constants.E.target_duration,
        3: Constants.E.damage,
        4: Constants.E.bind,
        5: Constants.E.range_increase,
        6: Constants.E.damage.base,
        8: RatioPercent(Constants.E.damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FetterTime", values: Constants.E.bind},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
