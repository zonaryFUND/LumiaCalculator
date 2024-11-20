import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1040500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.duration,
        1: `${Constants.R.summoned_attack_speed[skillLevel]}%`,
        2: `${Constants.R.nina_movement_speed[skillLevel]}%`,
        3: `${Constants.R.we_cooldown_reduction}%`,
        5: `${Constants.R.attacked_damage}`,
        6: `${Constants.R.linked_damage}%`,
        7: Constants.R.damage.base[skillLevel],
        8: Constants.R.damage.base[skillLevel] * Constants.R.damage_max_multipler
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/LinkLineDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/NinaAttackSpeed", values: Constants.R.summoned_attack_speed, percent: true},
            {labelIntlID: "ToolTipType/NinaMoveSpeed", values: Constants.R.nina_movement_speed, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
