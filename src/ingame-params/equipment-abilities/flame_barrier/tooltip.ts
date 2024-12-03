import Constants from "./constants.json";
import { useValueContextOptional } from "components/tooltip/value-context";
import weaponRange from "app-types/subject-dynamic/config/weapon-range";
import { EquipmentAbilityTooltipValues } from "../type";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

const values: EquipmentAbilityTooltipValues = ({ importedDamage }) => {
    const { config } = useValueContextOptional();
    const range = weaponRange(config);
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