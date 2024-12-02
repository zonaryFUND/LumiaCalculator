import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1009300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.W.duration,
            1: Constants.W.tick,
        }
        if (showEquation) {
            return {
                ...base,
                2: Constants.W.damage.base,
                3: RatioPercent(Constants.W.damage.attack),
                4: Constants.W.defense_decline,
                6: RatioPercent(Constants.W.damage.amp),
                7: Constants.W.defense_decline_max,
                8: Constants.W.defense_decline_duration
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                2: Constants.W.defense_decline,
                3: Constants.W.defense_decline_duration,
                7: Constants.W.damage,
                9: Constants.W.defense_decline_max
            } as Record<number, number | string | ValueRatio>
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefense", values: Constants.W.defense_decline},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
