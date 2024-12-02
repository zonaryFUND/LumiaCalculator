import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045200;

export const info: SkillTooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ }) => ({
        0: Constants.Q.damage.base,
        4: RatioPercent(Constants.Q.damage.amp),
        5: Constants.Q.duration,
        6: Constants.Q.slow.duration,
        7: RatioPercent(Constants.Q.slow.effect),
        10: RatioPercent(Constants.Q.damage.defense),
        11: RatioPercent(Constants.Q.damage.maxHP),
        20: Constants.Q.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.Q.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.Q.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown}
        ]  
    })
}
