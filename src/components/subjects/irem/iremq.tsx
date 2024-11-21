import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1061200;

const maxDamageMultiplier = Constants.IremQ.ratio * Constants.IremQ.max_ratio_count + 1;
const maxDamageConstants = {
    base: Constants.IremQ.damage.base.map(d => d * maxDamageMultiplier),
    amp: maxDamageMultiplier * Constants.IremQ.damage.amp
};

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.IremQ.sp_cost
    },
    cooldown: Constants.IremQ.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.IremQ.damage.base[skillLevel],
                2: `${Constants.IremQ.damage.amp}%`,
                3: maxDamageConstants.base[skillLevel],
                5: `${maxDamageConstants.amp}%`,
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
