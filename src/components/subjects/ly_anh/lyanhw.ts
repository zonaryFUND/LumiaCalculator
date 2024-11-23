import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1063300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "hp",
        value: Constants.LyAnhW.hp_cost
    },
    cooldown: Constants.LyAnhW.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.LyAnhW.damage.base,
                1: RatioPercent(Constants.LyAnhW.damage.attack),
                2: RatioPercent(Constants.LyAnhW.slow.effect),
                3: Constants.LyAnhW.slow.duration,
                4: Constants.GhostW.damage.base,
                5: RatioPercent(Constants.GhostW.damage.attack),
                6: RatioPercent(Constants.GhostW.movement_speed.effect),
                7: Constants.GhostW.movement_speed.duration,
                8: Constants.GhostW.qe_cooldown_reduction,
                9: Constants.GhostW.max_stack
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.LyAnhW.damage,
                1: RatioPercent(Constants.LyAnhW.slow.effect),
                2: Constants.LyAnhW.slow.duration,
                3: Constants.GhostW.damage,
                4: RatioPercent(Constants.GhostW.movement_speed.effect),
                5: Constants.GhostW.movement_speed.duration,
                6: Constants.GhostW.qe_cooldown_reduction,
                7: Constants.GhostW.max_stack
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.LyAnhW.thrash
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.LyAnhW.damage.base},
            {labelIntlID: "ToolTipType/LyanhPossession_Active2_Damage", values: Constants.GhostW.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.LyAnhW.cooldown},
        ]  
    })
}
