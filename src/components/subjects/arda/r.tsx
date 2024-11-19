import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1066500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation, config }) => {
        const baseQDamage = {
            base: Constants.Q.damage.base[config.skillLevels.Q],
            amp: Constants.Q.damage.amp
        };
        const baseWInnerDamage = {
            base: Constants.W.damage.base[config.skillLevels.W],
            amp: Constants.W.damage.amp
        };
        const baseWVanishDamage = {
            base: Constants.W.vanish_damage.base[config.skillLevels.W],
            amp: Constants.W.vanish_damage.amp
        };
        const baseEDamage = {
            base: Constants.E.damage.base[config.skillLevels.E],
            amp: Constants.E.damage.amp
        };

        return {
            0: Constants.R.duration,
            1: `${Constants.R.Q.cooldown_reduction}%`,
            2: showEquation ? baseQDamage.base : baseQDamage,
            3: Constants.R.Q.second_time,
            4: showEquation ? Constants.R.Q.damage.base[skillLevel] : Constants.R.Q.damage,
            5: showEquation ? baseWInnerDamage.base : baseWInnerDamage,
            6: Constants.W.slow.duration,
            7: `${Constants.W.slow.effect}%`,
            8: showEquation ? `${Constants.R.W.damage.base[skillLevel]}` : Constants.R.W.damage,
            9: showEquation ? baseWVanishDamage.base : baseWVanishDamage,
            10: Constants.R.W.bind[skillLevel],
            11: showEquation ? baseEDamage.base : baseEDamage,
            12: Constants.R.E.duration,
            13: 1,
            14: Constants.R.E.range[skillLevel],
            15: showEquation ? `${baseQDamage.amp}%` : Constants.R.W.duration,
            16: showEquation ? `${Constants.R.Q.damage.amp}%` : Constants.W.stun,
            17: `${baseWInnerDamage.amp}%`,
            18: `${Constants.R.W.damage.amp}%`,
            19: `${baseWVanishDamage.amp}%`,
            20: `${baseEDamage.amp}%`,
            21: Constants.R.W.duration,
            22: Constants.W.stun
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/ArdaActive1Damage", values: Constants.R.Q.damage.base},
            {labelIntlID: "ToolTipType/ArdaActive2Damage", values: Constants.R.W.damage.base},
            {labelIntlID: "ToolTipType/ArdaActive2Duration", values: Constants.R.W.bind},
            {labelIntlID: "ToolTipType/ArdaActive3Range", values: Constants.R.E.range},
        ]  
    })
}
