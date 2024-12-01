import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1061300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.IremW.sp_cost
    },
    cooldown: Constants.IremW.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: RatioPercent(Constants.IremW.slow),
            2: Constants.IremW.channel,
            3: Constants.IremW.charm,
            4: Constants.IremW.slow_remain
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.IremW.damage.base,
                6: RatioPercent(Constants.IremW.damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                0: Constants.IremW.damage,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.IremW.damage.base},
            {labelIntlID: "ToolTipType/CharmDuration", values: Constants.IremW.charm},
            {labelIntlID: "ToolTipType/Cost", values: Constants.IremW.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.IremW.cooldown},
        ]  
    })
}
