import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1070100;

export const info: TooltipInfo = {
    skill: "T",
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
