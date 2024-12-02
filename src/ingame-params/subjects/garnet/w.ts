import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1076300;

export const info: TooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const {stack, ...healWithoutStack} = Constants.W.finish_heal;
        const base = {
            0: Constants.W.qe_cooldown_reduction_per_stack,
            1: Constants.W.damage_reduction.duration,
            2: RatioPercent(Constants.W.damage_reduction.effect),
            3: RatioPercent(Constants.W.heal.lostHP),
        }

        if (showEquation) {
            return {
                ...base,
                4: Constants.W.min_damage.base,
                5: RatioPercent(Constants.W.min_damage.amp),
                6: RatioPercent(Constants.W.min_damage.maxHP),
                7: Constants.W.max_damage.base,
                8: RatioPercent(Constants.W.max_damage.amp),
                9: RatioPercent(Constants.W.max_damage.maxHP),
                10: Constants.W.slow.duration,
                11: RatioPercent(Constants.W.slow.effect),
                12: Constants.W.max_charge_bind,
                13: Constants.W.finish_heal.base,
                14: RatioPercent(Constants.W.finish_heal.amp),
                15: RatioPercent(Constants.W.finish_heal.maxHP),
                16: stack,
                17: Constants.W.heal_tick
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                4: Constants.W.min_damage,
                5: Constants.W.max_damage,
                6: Constants.W.slow.duration,
                7: RatioPercent(Constants.W.slow.effect),
                8: Constants.W.max_charge_bind,
                9: healWithoutStack,
                10: stack,
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
