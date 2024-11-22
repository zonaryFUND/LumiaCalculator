import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1054100;

export const info: TooltipInfo = {
    skill: "T",
    values: ({ skillLevel, showEquation, status }) => {
        const base = {
            0: Constants.T.max_attack_speed,
            1: 0.01,
            2: Constants.T.amp_conversion
        }
        if (showEquation) {
            return {
                ...base,
                4: Constants.T.full_charge_damage.base[skillLevel],
                5: `${Constants.T.full_charge_damage.amp}%`,
                6: `${Constants.T.full_charge_damage.targetMaxHP[skillLevel]}%`,
                7: `${Constants.T.full_charge_damage.attack}%`,
                8: Constants.T.damage.base[skillLevel],
                9: `${Constants.T.damage.attack}%`,
                10: `${Constants.T.damage.amp}%`,
                11: Constants.T.slow.duration,
                12: `${Constants.T.slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.T.charge_time[skillLevel],
                4: Constants.T.full_charge_damage,
                5: `${Constants.T.full_charge_damage.targetMaxHP[skillLevel]}%`,
                6: Constants.T.damage,
                7: Constants.T.slow.duration,
                8: `${Constants.T.slow.effect}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/KarlaNormalAttack", values: Constants.T.damage.base},
            {labelIntlID: "ToolTipType/KarlaReinforceNormalAttack", values: Constants.T.full_charge_damage.base},
            {labelIntlID: "ToolTipType/SkillAddDamageMaxHpRatio", values: Constants.T.full_charge_damage.targetMaxHP, percent: true},
            {labelIntlID: "ToolTipType/ChargingTime", values: Constants.T.charge_time},
        ]  
    })
}
