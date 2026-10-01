import Constants from "./constants";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1091400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.duration,
        1: RatioPercent(Constants.E.take_over),
        2: RatioPercent(Constants.E.heal),
        3: Constants.E.lucia_additional_range,
        4: RatioPercent(Constants.E.lucia_take_over),
        5: RatioPercent(Constants.E.lucia_heal),
        6: RatioPercent(Constants.E.min_hp),
        7: Constants.E.movement_speed.duration,
        8: RatioPercent(Constants.E.movement_speed.effect),
        20: Constants.E.take_over.base,
        21: RatioPercent(Constants.E.take_over.additionalMaxHP),
        22: Constants.E.lucia_additional_range,
        23: RatioPercent(Constants.E.lucia_take_over),
        24: RatioPercent(Constants.E.lucia_take_over.additionalMaxHP)
    }),
    expansion: () => ({
        enumeratedValues: [
            { labelIntlID: "ToolTipType/SeresEReduceDamage", values: Constants.E.take_over.base, percent: true },
            { labelIntlID: "ToolTipType/SeresEReduceDamage_Lucia", values: Constants.E.lucia_take_over.base, percent: true },
            { labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown }
        ]
    })
}
