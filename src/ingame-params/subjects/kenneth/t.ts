import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1071100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.duration,
            1: 1,
            2: Constants.T.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.T.damage.targetMaxHP.base,
                4: RatioPercent(Constants.T.damage.targetMaxHP.attack),
                5: Constants.T.heal.base,
                6: RatioPercent(Constants.T.heal.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: RatioPercent(Constants.T.damage.targetMaxHP),
                4: RatioPercent(Constants.T.heal)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: ({ skillLevel }) => ({
        tipValues: {
            0: Constants.T.max_heal,
            1: Constants.T.max_heal.base[skillLevel],
            2: RatioPercent(Constants.T.max_heal.attack),
            3: Constants.T.animal_max
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.targetMaxHP.attack, percent: true},
            {labelIntlID: "ToolTipType/MaxHpRegen", values: Constants.T.max_heal.base}
        ]  
    })
}
