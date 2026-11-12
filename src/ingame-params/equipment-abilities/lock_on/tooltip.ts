import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { markDamageOf } from "./mark-damage";

const values: EquipmentAbilityTooltipValues = ({ showEquation, status }): TooltipValues => {
    if (showEquation) {
        return {
            0: Constants.cooldown,
            1: Constants.damage.base,
            2: RatioPercent(Constants.damage.attack),
            3: Constants.mark_duration,
            4: Constants.mark_damage.base,
            5: RatioPercent(Constants.mark_damage.attack),
            6: RatioPercent(Constants.mark_damage.criticalChance),
            7: Constants.ms.duration,
            8: Constants.ms.effect
        }
    } else {
        return {
            0: Constants.cooldown,
            1: Constants.damage,
            2: Constants.mark_duration,
            // 致命打確率の項は加算項でValueRatioでは表現できないため、計算済みの値を渡す（mark-damage.ts参照）
            3: markDamageOf(status).toNumber(),
            4: Constants.ms.duration,
            5: Constants.ms.effect
        }
    }
}

export default values;