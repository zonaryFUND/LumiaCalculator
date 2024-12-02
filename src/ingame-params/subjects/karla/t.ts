import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1054100;

export const info: SkillTooltipProps = {
    skillKey: "T",
    values: ({ showEquation }) => {
        const base = {
            0: Constants.T.max_attack_speed,
            1: 0.01,
            2: Constants.T.amp_conversion
        }
        if (showEquation) {
            return {
                ...base,
                4: Constants.T.full_charge_damage.base,
                5: RatioPercent(Constants.T.full_charge_damage.amp),
                6: RatioPercent(Constants.T.full_charge_damage.targetMaxHP),
                7: RatioPercent(Constants.T.full_charge_damage.attack),
                8: Constants.T.damage.base,
                9: RatioPercent(Constants.T.damage.attack),
                10: RatioPercent(Constants.T.damage.amp),
                11: Constants.T.slow.duration,
                12: RatioPercent(Constants.T.slow.effect)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                3: Constants.T.charge_time,
                4: Constants.T.full_charge_damage,
                5: RatioPercent(Constants.T.full_charge_damage.targetMaxHP),
                6: Constants.T.damage,
                7: Constants.T.slow.duration,
                8: RatioPercent(Constants.T.slow.effect)
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
