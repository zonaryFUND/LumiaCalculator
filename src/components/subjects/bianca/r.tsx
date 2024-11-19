import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1042500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "hp-ratio",
        value: Constants.R.hp_cost_percent
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.R.first_damage.base[skillLevel] : Constants.R.first_damage,
        2: `${Constants.R.first_damage.targetMaxHP}%`,
        3: `${Constants.R.slow.effect}%`,
        4: `${Constants.R.omnisyphon_amp[skillLevel]}%`,
        5: showEquation ? `${Constants.R.min_damage.base[skillLevel]}` : Constants.R.min_damage,
        6: Constants.R.max_damage,
        7: Constants.R.max_damage.base[skillLevel],
        9: showEquation ? Constants.R.heal.base[skillLevel] : Constants.R.heal,
        11: `${Constants.R.heal.lostHP}%`,
        12: `${Constants.R.multiple_hit_heal_amp}%`,
        13: showEquation ? `${Constants.R.first_damage.amp}%` : Constants.R.slow.duration,
        14: `${Constants.R.min_damage.amp}%`,
        15: `${Constants.R.max_damage.amp}%`,
        16: `${Constants.R.heal.amp}%`,
        17: Constants.R.slow.duration
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.R.min_damage.base},
            {labelIntlID: "ToolTipType/MaxAdditionalDamage", values: Constants.R.max_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/LifeSteal", values: Constants.R.omnisyphon_amp, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
