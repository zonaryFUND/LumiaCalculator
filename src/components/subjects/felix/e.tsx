import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1049400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: {constant: Constants.T.shared_cooldown},
    values: ({ skillLevel, showEquation, status }) => {
        if (showEquation) {
            return {
                0: Constants.E.damage.base[skillLevel],
                1: `${Constants.E.damage.attack}%`,
                2: Constants.E.enhanced_damage.base[skillLevel],
                3: `${Constants.E.enhanced_damage.attack}%`,
                4: Constants.E.enhanced_damage.level,
                5: Constants.E.cooldown_reduction,
                8: Constants.E.omnisyphon.duration,
                9: Constants.E.omnisyphon.effect.perStack,
                10: `${Constants.E.omnisyphon.effect.attack}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            const omnisyphonBase = status.attackPower.calculatedValue.percent(Constants.E.omnisyphon.effect.attack);
            return {
                0: Constants.E.damage,
                1: Constants.E.enhanced_damage,
                2: Constants.E.cooldown_reduction,
                3: Constants.E.omnisyphon.duration,
                4: `${omnisyphonBase.add(1).toString()}%`,
                5: `${omnisyphonBase.add(Constants.T.max_stack).toString()}%`,
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FinalSequenceDamage", values: Constants.E.enhanced_damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
