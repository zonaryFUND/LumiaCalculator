import Constants from "./constants.json";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ showEquation, config, importedDamage }) => {
    if (importedDamage == undefined) throw new Error("electric shock needs imported damage");
    if ("melee" in importedDamage == false) throw new Error("electric shock needs range-dependent damage");

    const base = {
        0: Constants.max_stack
    }

    if (showEquation) {
        return FilterUndefined({
            1: RatioPercentOptional(importedDamage.melee.targetMaxHP),
            4: (importedDamage.melee.base as number) + (importedDamage.melee.level as number),
            5: (importedDamage.melee.base as number) + (importedDamage.melee.level as number) * 20,
            6: RatioPercentOptional(importedDamage.range.targetMaxHP),
            9:(importedDamage.range.base as number) + (importedDamage.range.level as number),
            10: (importedDamage.range.base as number) + (importedDamage.range.level as number) * 20,
            11: Constants.duration
        })
    } else {
        const rangeDependent = importedDamage[weaponRange(config)];
        return FilterUndefined({
            ...base,
            1: RatioPercentOptional(rangeDependent.targetMaxHP),
            6: rangeDependent,
            7: Constants.duration,
        })
    }
}

export default values;