import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1031500;

export const info: TooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: 3
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.R.hankyu_first_damage.base,
                2: RatioPercent(Constants.R.hankyu_first_damage.attack),
                3: Constants.R.hankyu_second_damage.base,
                4: RatioPercent(Constants.R.hankyu_second_damage.attack),
                5: Constants.R.daikyu_damage.base,
                6: RatioPercent(Constants.R.daikyu_damage.attack),
                7: Constants.R.daikyu_slow.duration,
                8: RatioPercent(Constants.R.daikyu_slow.effect),
                9: Constants.R.hankyu_knockback,
                10: Constants.R.hankyu_stun,
                11: Constants.R.hankyu_cooldown_reduction,
                12: Constants.R.daikyu_acceleration,
                13: RatioPercent(Constants.R.daikyu_enhance.velocity),
                14: RatioPercent(Constants.R.daikyu_enhance.damage),
                15: RatioPercent(Constants.R.daikyu_enhance.slow_duration)
            }
        } else {
            return {
                ...base,
                1: Constants.R.hankyu_first_damage,
                2: Constants.R.hankyu_cooldown_reduction,
                3: Constants.R.hankyu_second_damage,
                4: Constants.R.hankyu_knockback,
                5: Constants.R.hankyu_stun,
                6: Constants.R.daikyu_damage,
                7: Constants.R.daikyu_slow.duration,
                8: RatioPercent(Constants.R.daikyu_slow.effect),
                9: Constants.R.daikyu_acceleration,
                10: RatioPercent(Constants.R.daikyu_enhance.velocity),
                11: RatioPercent(Constants.R.daikyu_enhance.damage),
                12: RatioPercent(Constants.R.daikyu_enhance.slow_duration)
            }
        }

    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/ShortBowDamage", values: Constants.R.hankyu_first_damage.base},
            {labelIntlID: "ToolTipType/ShortBowLastDamage", values: Constants.R.hankyu_second_damage.base},
            {labelIntlID: "ToolTipType/YumiFirstDamage", values: Constants.R.daikyu_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
