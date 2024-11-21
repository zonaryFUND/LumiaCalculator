import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1076300;

export const info: TooltipInfo = {
    skill: "W",
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const {stack, ...healWithoutStack} = Constants.W.finish_heal;
        const base = {
            0: Constants.W.qe_cooldown_reduction_per_stack,
            1: Constants.W.damage_reduction.duration,
            2: `${Constants.W.damage_reduction.effect}%`,
            3: `${Constants.W.heal.lostHP}%`,
        }

        if (showEquation) {
            return {
                ...base,
                4: Constants.W.min_damage.base[skillLevel],
                5: `${Constants.W.min_damage.amp}%`,
                6: `${Constants.W.min_damage.maxHP}%`,
                7: Constants.W.max_damage.base[skillLevel],
                8: `${Constants.W.max_damage.amp}%`,
                9: `${Constants.W.max_damage.maxHP}%`,
                10: Constants.W.slow.duration,
                11: `${Constants.W.slow.effect}%`,
                12: Constants.W.max_charge_bind,
                13: Constants.W.finish_heal.base[skillLevel],
                14: `${Constants.W.finish_heal.amp}%`,
                15: `${Constants.W.finish_heal.maxHP}%`,
                16: stack[skillLevel],
                17: Constants.W.heal_tick
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                4: Constants.W.min_damage,
                5: Constants.W.max_damage,
                6: Constants.W.slow.duration,
                7: `${Constants.W.slow.effect}%`,
                8: Constants.W.max_charge_bind,
                9: healWithoutStack,
                10: stack[skillLevel],
                11: Constants.W.heal_tick,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.W.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.W.max_damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.finish_heal.base},
            {labelIntlID: "ToolTipType/PainHeal", values: Constants.W.finish_heal.stack},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
