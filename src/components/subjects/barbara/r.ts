import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1026500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.R.cancel_cooldown,
        1: showEquation ? Constants.R.Q.hp.base : Constants.R.Q.hp,
        2: Constants.R.Q.duration,
        3: Constants.R.Q.duration,
        4: showEquation ? Constants.R.Q.duration : Constants.R.Q.attack_speed,
        5: showEquation ? Constants.R.Q.attack_speed : Constants.R.Q.railgun_count,
        6: showEquation ? Constants.R.Q.railgun_count : Constants.R.W.damage,
        7: showEquation ? Constants.R.W.damage.base : Constants.R.W.dot_duration,
        8: showEquation ? RatioPercent(Constants.R.W.damage.amp) : Constants.R.W.dot_damage,
        9: showEquation ? Constants.R.W.dot_duration : Constants.R.E.damage,
        10: showEquation ? Constants.R.W.dot_damage.base : Constants.R.E.stun,
        11: showEquation ? RatioPercent(Constants.R.W.dot_damage.amp) : Constants.R.E.dot_tick,
        12: showEquation ? Constants.R.E.damage.base : Constants.R.E.dot_damage,
        13: showEquation ? RatioPercent(Constants.R.E.damage.amp) : RatioPercent(Constants.R.E.slow),
        14: showEquation ? Constants.R.E.stun : Constants.R.W.movement_speed.duration,
        15: showEquation ? Constants.R.E.dot_tick : RatioPercent(Constants.R.W.movement_speed.effect),
        16: showEquation ? Constants.R.E.dot_damage.base : Constants.R.W.movement_speed.duration,
        17: RatioPercent(Constants.R.E.dot_damage.amp),
        18: RatioPercent(Constants.R.E.slow),
        19: Constants.R.Q.hp.level,
        20: Constants.R.W.movement_speed.duration,
        21: RatioPercent(Constants.R.W.movement_speed.effect),
        22: Constants.R.W.movement_speed.duration
    }),
    expansion: ({ }) => ({
        tipValues: {
            0: Constants.R.Q.damage.base,
            1: RatioPercent(Constants.R.Q.damage.amp),
            2: Constants.R.Q.railgun_damage.base,
            3: RatioPercent(Constants.R.Q.railgun_damage.amp),
            4: Constants.R.Q.sentry_defence
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TurretNormalAttack", values: Constants.R.Q.damage.base},
            {labelIntlID: "ToolTipType/TurretRailgunDamage", values: Constants.R.Q.railgun_damage.base},
            {labelIntlID: "ToolTipType/BarbaraLaserDamage", values: Constants.R.W.damage.base},
            {labelIntlID: "ToolTipType/BarbaraLaserDotDamage", values: Constants.R.W.dot_damage.base},
            {labelIntlID: "ToolTipType/BarbaraGrenadeDamage", values: Constants.R.E.damage.base},
            {labelIntlID: "ToolTipType/BarbaraGrenadeDotDamage", values: Constants.R.E.dot_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
