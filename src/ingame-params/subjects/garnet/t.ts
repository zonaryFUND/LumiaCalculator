import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1076100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.T.reduction.base,
                1: RatioPercent(Constants.T.reduction.amp),
                2: RatioPercent(Constants.T.reduction.maxHP)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.T.reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PreventBasicAttackDamaged", values: Constants.T.reduction.base}
        ]  
    })
}
