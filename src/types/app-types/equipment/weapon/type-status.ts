import Decimal from "decimal.js";
import Dictionary from "dictionary/weapon-type-status.json"
import { SanitizeApiWeaponName, WeaponTypeID } from "./type-id";

type Status = {
    attackSpeed: Decimal
    range: Decimal
}

export const WeaponTypeStatus = Dictionary.reduce((prev, entry) => {
    const key = SanitizeApiWeaponName(entry.type);
    return {
        ...prev,
        [key]: {
            attackSpeed: new Decimal(entry.attackSpeed),
            range: new Decimal(entry.attackRange)
        }
    }
}, {} as { [key in WeaponTypeID]: Status });
