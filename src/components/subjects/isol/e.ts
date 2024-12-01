import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1009400;

export const info: TooltipProps = {
    skillKey: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.hide_duration,
            1: Constants.W.tick,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.damage.base,
                2: RatioPercent(Constants.E.damage.amp),
                3: Constants.E.attack_duration
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.E.damage,
                2: Constants.E.attack_duration
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/StealthTime", values: Constants.E.hide_duration},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
