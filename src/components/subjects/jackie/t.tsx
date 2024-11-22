import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1001100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: Constants.T.bleeding_duration
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.T.bleeding_damage.base[skillLevel],
                2: Constants.T.damage.base[skillLevel],
                3: `${Constants.T.bleeding_damage.attack}%`,
                5: `${Constants.T.damage.attack}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.T.bleeding_damage,
                2: Constants.T.damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BleedDanage", values: Constants.T.bleeding_damage.base},
            {labelIntlID: "ToolTipType/BleedAdditionalDamage", values: Constants.T.damage.base},
        ]  
    })
}
