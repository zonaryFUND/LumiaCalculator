import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1070100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.stack_duration,
            1: Constants.T.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.T.damage.base,
                3: RatioPercent(Constants.T.damage.additionalAttack),
                4: RatioPercent(Constants.T.damage.targetMaxHP.base),
                5: RatioPercent(Constants.T.damage.targetMaxHP.additionalAttack)
            }
        } else {
            return {
                ...base,
                2: Constants.T.damage.base,
                3: RatioPercent(Constants.T.damage.targetMaxHP)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.T.damage.targetMaxHP.base}
        ]  
    })
}
