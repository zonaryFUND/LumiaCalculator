import Constants from "./constants.json";
import { TooltipProps } from "components/tooltip/skill/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1069300;

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
                1: Constants.W.damage.level,
                2: RatioPercent(Constants.W.damage.amp),
                6: Constants.W.slow.duration,
                7: RatioPercent(Constants.W.slow.center),
                8: RatioPercent(Constants.W.slow.outer),
                9: Constants.W.ally_slow.duration,
                10: RatioPercent(Constants.W.ally_slow.effect),
                11: Constants.W.movement_speed.duration,
                12: RatioPercent(Constants.W.movement_speed.effect.base),
                13: Constants.W.movement_speed.effect.level
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                2: Constants.W.slow.duration,
                3: RatioPercent(Constants.W.slow.center),
                4: RatioPercent(Constants.W.slow.outer),
                5: Constants.W.ally_slow.duration,
                6: RatioPercent(Constants.W.ally_slow.effect),
                7: Constants.W.movement_speed.duration,
                8: RatioPercent(Constants.W.movement_speed.effect)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/MoveSpeedUpRatio", values: Constants.W.movement_speed.effect.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
