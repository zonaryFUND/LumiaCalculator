import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1004300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation, status }) => {
        const additionalCount = status.defense.additionalValue?.div(Constants.W.additional_hit_per__additional_defense).floor().toNumber() ?? 0;
        const base = {
            0: Constants.W.duration,            
            6: Constants.W.cooldown_reduction,
            8: RatioPercent(Constants.W.tenacity)
        }

        if (showEquation) {
            return {
                ...base,
                1: Constants.W.damage.base,
                3: RatioPercent(Constants.W.damage.additionalAttack),
                4: Constants.W.count,
                7: RatioPercent(Constants.W.damage.amp),
                9: RatioPercent(Constants.W.damage.targetMaxHP),
                10: Constants.W.additional_hit_per__additional_defense,
                11: 1
            }
        } else {
            return {
                ...base,
                1: RatioPercent(Constants.W.damage.targetMaxHP),
                4: Constants.W.count + additionalCount,
                20: Constants.W.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
