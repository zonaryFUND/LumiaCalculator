import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1050400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            3: Constants.E.stepsequence_cost,
            8: RatioPercent(Constants.E.defense)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.E.damage.base,
                1: RatioPercent(Constants.E.damage.additionalMaxHP),
                4: RatioPercent(Constants.E.damage.amp),
                6: Constants.E.stepsequence_recovery,
                7: Constants.E.stepsequence_recovery_on_ice
            }
        } else {
            return {
                ...base,
                0: Constants.E.damage,
                4: Constants.E.stepsequence_recovery,
                5: Constants.E.stepsequence_recovery_on_ice
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/IncreaseDefenceRatio", values: Constants.E.defense, percent: true},
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base}
        ]  
    })
}
