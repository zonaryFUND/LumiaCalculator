import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1055300;

export const info: TooltipProps = {
    skillKey: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                2: RatioPercent(Constants.W.damage.amp),
                3: Constants.W.slow.duration,
                4: RatioPercent(Constants.W.slow.effect),
                5: Constants.W2.duration,
                6: Constants.W2.damage.base,
                7: RatioPercent(Constants.W2.damage.maxHP),
                8: RatioPercent(Constants.W2.damage.amp),
                9: RatioPercent(Constants.W2.slow_max),
                10: Constants.W2.tick
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.slow.duration,
                2: RatioPercent(Constants.W.slow.effect),
                3: Constants.W2.duration,
                4: Constants.W2.damage,
                5: RatioPercent(Constants.W2.slow_max),
                6: Constants.W2.tick
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/EstelleSkillDamage2_1", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/EstelleSkillDamage3_2", values: Constants.W2.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
