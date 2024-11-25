import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1031400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.E.max_target,
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.E.hankyu_damage.base,
                2: RatioPercent(Constants.E.hankyu_damage.attack),
                4: Constants.E.daikyu_damage.base,
                5: RatioPercent(Constants.E.daikyu_damage.attack),
                6: Constants.E.daikyu_range,
                7: Constants.E.daikyu_range_damage.base,
                8: RatioPercent(Constants.E.daikyu_range_damage.attack)
            }
        } else {
            return {
                ...base,
                1: Constants.E.hankyu_damage,
                3: Constants.E.daikyu_damage,
                4: Constants.E.daikyu_range,
                5: Constants.E.daikyu_range_damage
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShortBowDamage", values: Constants.E.hankyu_damage.base},
            {labelIntlID: "ToolTipType/YumiFirstDamage", values: Constants.E.daikyu_damage.base},
            {labelIntlID: "ToolTipType/YumiSecondDamage", values: Constants.E.daikyu_range_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
