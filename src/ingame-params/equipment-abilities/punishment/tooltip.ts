import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, importedDamage, importedValues }) => {
    const base: TooltipValues = {
        0: Constants.threshold,
        1: Constants.count,
        3: Constants.shield_duration,
        4: Constants.shield_duration,
        5: Constants.cooldown,
        7: Constants.cooldown
    }

    const damage = importedDamage as ValueRatio;
    const shield = importedValues as ValueRatio;

    if (showEquation) {
        return {
            ...base,
            2: damage.base!,
            3: RatioPercentOptional(damage.additionalAttack)!,
            5: shield.base!,
            6: RatioPercentOptional(shield.attack)!,
            8: RatioPercentOptional(damage.amp)!,
            9: RatioPercentOptional(shield.amp)!,
            10: damage.level!,
            11: shield.level!
        } satisfies TooltipValues
    } else {
        return {
            ...base,
            2: damage,
            4: shield
        }
    }
}

export default values;