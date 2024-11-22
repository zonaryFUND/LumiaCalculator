import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import Decimal from "decimal.js";

export const code = 1054200;

export const info: TooltipInfo = {
    skill: "Q",
    cooldown: ({ status }) => {
        // NOTE: This multiplier is an estimated value.
        return new Decimal(Constants.Q.cooldown.constant).dividedBy(status.attackSpeed.calculatedValue).round2();
    },
    values: ({ skillLevel, showEquation }) => {
        const base = {
            2: Constants.Q.max,
            3: Constants.Q.range,
            4: Constants.Q.duration,
            5: Constants.T.max_attack_speed,
        }
        if (showEquation) {
            return {
                ...base,
                1: `${Constants.Q.damage.attack[skillLevel]}%`,
                6: `${Constants.Q.second_damage.attack[skillLevel]}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.Q.damage,
                6: Constants.Q.second_damage
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.Q.damage.attack, percent: true}
        ]  
    })
}
