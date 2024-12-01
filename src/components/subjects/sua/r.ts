import Constants from "./constants.json";
import { TooltipProps, TooltipValues } from "components/tooltip/skill/tooltip-props";
import { RatioPercent } from "../../tooltip/skill/valueratio-to-string";

export const code = 1028500;

const healMax = {
    base: Constants.RE.heal.base.map(v => v * Constants.RE.heal_max_multiplier),
    amp: Constants.RE.heal.amp * Constants.RE.heal_max_multiplier
}

export const info: TooltipProps = {
    skillKey: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.RQ.damage.base,
                1: Constants.RE.slow.duration,
                2: RatioPercent(Constants.RQ.damage.amp),
                3: Constants.RQ.bookmark_duration,
                4: Constants.RQ.bookmark_damage.base,
                5: RatioPercent(Constants.RE.slow.duration),
                6: RatioPercent(Constants.RQ.bookmark_damage.amp),
                8: Constants.RW.shield.base,
                10: RatioPercent(Constants.RW.shield.amp),
                11: Constants.RW.damage.base,
                13: RatioPercent(Constants.RW.damage.amp),
                14: Constants.RW.blind_duration,
                15: Constants.RE.damage,
                17: RatioPercent(Constants.RE.damage.amp),
                18: Constants.RE.bookmark_damage.base,
                20: RatioPercent(Constants.RE.bookmark_damage.amp),
                21: Constants.RE.heal.base,
                23: RatioPercent(Constants.RE.heal.amp),
                24: healMax.base,
                26: RatioPercent(healMax.amp),
                27: RatioPercent(Constants.RQ.center_multiplier),
                28: Constants.RQ.slow.duration,
                29: RatioPercent(Constants.RQ.slow.effect)
            }
        } else {   
            return {
                0: Constants.RQ.damage,
                1: Constants.RQ.bookmark_duration,
                2: Constants.RQ.bookmark_damage,
                3: Constants.RQ.stun,
                4: Constants.RW.shield,
                5: Constants.RW.damage,
                6: Constants.RW.blind_duration,
                7: Constants.RE.damage,
                8: Constants.RE.bookmark_damage,
                9: Constants.RE.heal,
                10: healMax,
                14: Constants.RE.slow.duration,
                15: RatioPercent(Constants.RE.slow.effect)
            }
        }
        
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SuaSkill01Damage", values: Constants.RQ.damage.base},
            {labelIntlID: "ToolTipType/SuaSkill02Damage", values: Constants.RW.damage.base},
            {labelIntlID: "ToolTipType/SuaSkill03Damage", values: Constants.RE.damage.base},
            {labelIntlID: "ToolTipType/SuaSkill03StunDamage", values: Constants.RE.bookmark_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
