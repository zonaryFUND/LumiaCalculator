import Constants from "./constants.json";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { EquipmentAbilityTooltipValues } from "../type";
import { FilterUndefined, RatioPercent, RatioPercentOptional } from "@app/ingame-params/valueratio-to-string";
import { TooltipValues } from "@app/ingame-params/skill-tooltip-props";

const values: EquipmentAbilityTooltipValues = ({ config, importedDamage }) => {
    const range = weaponRange(config);
    const base = {
        4: Constants.time_bound,
        5: Constants.cooldown,
        6: {intlID: range == "melee" ? "Item/WeaponType/근거리" : "Item/WeaponType/원거리"} 
    } satisfies TooltipValues;

    if (importedDamage != undefined && "melee" in importedDamage) {
        return FilterUndefined({
            ...base,
            1: RatioPercentOptional(importedDamage.melee.targetMaxHP),
            7: RatioPercentOptional(importedDamage.range.targetMaxHP),
        })
    } else if (importedDamage != undefined) {
        return FilterUndefined({
            ...base,
            2: importedDamage,
            3: RatioPercentOptional(importedDamage.maxHP),
            8: RatioPercentOptional(importedDamage.amp),
            9: importedDamage.level
        })
    } else {
        throw Error("importedDamage is invalid");
    }
}

export default values;