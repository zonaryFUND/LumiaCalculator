import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1001100;

export const info: TooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.bleeding_duration
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.T.bleeding_damage.base,
                2: Constants.T.damage.base,
                3: RatioPercent(Constants.T.bleeding_damage.attack),
                5: RatioPercent(Constants.T.damage.attack)
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
