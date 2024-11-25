import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1031300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.hankyu_damage.base,
                1: RatioPercent(Constants.W.hankyu_damage.attack),
                2: Constants.W.hankyu_slow.duration,
                3: RatioPercent(Constants.W.hankyu_slow.effect),
                4: Constants.W.daikyu_damage.base,
                5: RatioPercent(Constants.W.daikyu_damage.attack),
                6: Constants.W.daikyu_behind_damage.base,
                7: RatioPercent(Constants.W.daikyu_behind_damage.attack),
                8: Constants.W.cooldown_reduction,
                9: RatioPercent(Constants.W.multiple_hit),
                10: Constants.W.daikyu_slow.duration,
                11: RatioPercent(Constants.W.daikyu_slow.effect)               
            }
        } else {
            return {
                0: Constants.W.hankyu_damage,
                1: Constants.W.hankyu_slow.duration,
                2: RatioPercent(Constants.W.hankyu_slow.effect),
                3: RatioPercent(Constants.W.multiple_hit),
                4: Constants.W.daikyu_damage,
                5: Constants.W.daikyu_behind_damage,
                6: Constants.W.cooldown_reduction,
                7: Constants.W.daikyu_slow.duration,
                8: RatioPercent(Constants.W.daikyu_slow.effect)
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShortBowDamage", values: Constants.W.hankyu_damage.base},
            {labelIntlID: "ToolTipType/YumiFirstDamage", values: Constants.W.daikyu_damage.base},
            {labelIntlID: "ToolTipType/YumiSecondDamage", values: Constants.W.daikyu_behind_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
