import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";

export const code = 1071100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, config, status }) => {
        const base = {
            0: Constants.T.duration,
            1: 1,
            2: Constants.T.max_stack
        }
        if (showEquation) {
            return {
                ...base,
                3: Constants.T.damage.targetMaxHP.base,
                4: `${Constants.T.damage.targetMaxHP.attack[skillLevel]}%`,
                5: Constants.T.heal.base,
                6: `${Constants.T.heal.attack}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: `${calculateValue(Constants.T.damage.targetMaxHP, status, config, skillLevel).static.floor().toString()}%`,
                4: `${calculateValue(Constants.T.heal, status, config, skillLevel).static.floor().toString()}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: ({ skillLevel }) => ({
        tipValues: {
            0: Constants.T.max_heal,
            1: Constants.T.max_heal.base[skillLevel],
            2: `${Constants.T.max_heal.attack}%`,
            3: Constants.T.animal_max
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.T.damage.targetMaxHP.attack, percent: true},
            {labelIntlID: "ToolTipType/MaxHpRegen", values: Constants.T.max_heal.base}
        ]  
    })
}
