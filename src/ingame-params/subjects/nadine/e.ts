import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1006400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => ({
        1: Constants.E.duration,
        2: Constants.E.wire_length,
        3: RatioPercent(showEquation ? Constants.E.attack_speed.base : Constants.E.attack_speed),
        4: Constants.E.remain,
        5: RatioPercent(Constants.E.attack_speed.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackSpeedRatioValue", values: Constants.E.attack_speed.base, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
