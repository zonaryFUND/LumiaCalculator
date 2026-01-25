import Constants from "./constants.json";
import { EquipmentAbilityTooltipValues } from "../type";
import { weaponRangeOf } from "app-types/subject-dynamic/config";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config }): TooltipValues => {
    const weaponRange = weaponRangeOf(config);

    if (showEquation) {
        return {
            2: Constants.damage.base,
            3: Constants.damage.additionalAttack,
            4: Constants.damage.amp,
            5: Constants.heal.melee.base,
            6: Constants.heal.melee.additionalAttack,
            7: Constants.heal.melee.amp,
            8: Constants.heal.range.base,
            9: Constants.heal.range.additionalAttack,
            10: Constants.heal.range.amp
        }
    } else {
        return {
            2: Constants.damage,
            3: weaponRange === "melee" ? Constants.heal.melee: Constants.heal.range
        }
    }
}

export default values;