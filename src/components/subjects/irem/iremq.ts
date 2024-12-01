import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1061200;

const maxDamageMultiplier = Constants.IremQ.ratio * Constants.IremQ.max_ratio_count + 1;
const maxDamageConstants = {
    base: Constants.IremQ.damage.base.map(d => d * maxDamageMultiplier),
    amp: maxDamageMultiplier * Constants.IremQ.damage.amp
};

export const info: TooltipProps = {
    skillKey: "Q",
    consumption: {
        type: "sp",
        value: Constants.IremQ.sp_cost
    },
    cooldown: Constants.IremQ.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.IremQ.damage.base,
                2: RatioPercent(Constants.IremQ.damage.amp),
                3: maxDamageConstants.base,
                5: RatioPercent(maxDamageConstants.amp),
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.IremQ.damage,
                1: maxDamageConstants
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            1: Constants.common.fish,
            2: Constants.common.fish_max
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.IremQ.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.IremQ.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.IremQ.cooldown},
        ]  
    })
}
