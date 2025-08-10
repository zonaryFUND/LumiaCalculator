import Constants from "./constants.json";
import { useValueContext, useValueContextOptional } from "components/tooltip/value-context";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";
import { weaponRangeOf } from "app-types/subject-dynamic/config";

const values: EquipmentAbilityTooltipValues = ({ importedDamage }) => {
    const { config } = useValueContext();
    const range = weaponRangeOf(config);
    const rangeDependentDamage = (() => {
        if ("melee" in importedDamage! && "range" in importedDamage!) {
            return importedDamage![range];
        }

        throw new Error("flame barrior tooltip needs its damage to be range-dependent value.");
    })();

    return {
        0: {intlID: range == "melee" ? "Item/WeaponType/근거리" : "Item/WeaponType/원거리"},
        1: Constants.area,
        3: RatioPercent(importedDamage.melee.maxHP!),
        4: rangeDependentDamage,
        7: RatioPercent(importedDamage.range.maxHP!)
    }
}

export default values;