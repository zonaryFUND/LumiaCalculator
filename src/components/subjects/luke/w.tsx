import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1022300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base[skillLevel],
                1: `${Constants.W.damage.attack}%`,
                3: Constants.W.duration,
                4: Constants.W.basic_attack_damage.base[skillLevel],
                5: `${Constants.W.basic_attack_damage.attack}%`,
                7: Constants.W.attack_speed.duration,
                8: `${Constants.W.attack_speed.one_stack}%`,
                9: Constants.W.attack_speed.max_stack,
                10: `${Constants.W.heal}%`,
                11: `${Constants.W.max_heal}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.duration,
                2: Constants.W.basic_attack_damage,
                3: Constants.W.attack_speed.duration,
                4: `${Constants.W.attack_speed.one_stack}%`,
                5: Constants.W.attack_speed.max_stack,
                6: `${Constants.W.heal}%`,
                7: `${Constants.W.max_heal}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/BulletDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AddSkillDamage", values: Constants.W.basic_attack_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
