import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1040300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.damage.base[skillLevel],
        2: `${Constants.W.slow}%`,
        3: Constants.W.drop_damage.base[skillLevel],
        4: `${Constants.W.drop_damage.attack}%`,
        5: Constants.W.drop_slow.duration,
        6: Constants.W.nina_damage.base[skillLevel],
        7: `${Constants.W.nina_damage.ninaAttack}%`,
        8: Constants.W.movement_speed.duration,
        9: `${Constants.W.movement_speed.effect}%`,
        10: Constants.W.airborne,
        12: `${Constants.W.damage.attack}%`,
        16: showEquation ? `${Constants.W.drop_slow.effect[skillLevel]}%` : Constants.W.damage,
        17: Constants.W.drop_damage,
        18: Constants.W.nina_damage,
        19: `${Constants.W.drop_slow.effect[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DamageSewing", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/DamageSewingDeco", values: Constants.W.drop_damage.base},
            {labelIntlID: "ToolTipType/DamageSewingSlow", values: Constants.W.drop_slow.effect, percent: true},
            {labelIntlID: "ToolTipType/DamageNinaKick", values: Constants.W.nina_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
