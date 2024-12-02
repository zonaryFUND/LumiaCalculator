import Decimal from "decimal.js";
import Dictionary from "@app/ingame-params/json/weapon-type-status.json"
import { WeaponTypeID } from "./type-id";

type Status = {
    attackSpeed: Decimal
    range: Decimal
}

export const WeaponTypeStatus = Dictionary.reduce((prev, entry) => {
    return {
        ...prev,
        [entry.type]: {
            attackSpeed: new Decimal(entry.attackSpeed),
            range: new Decimal(entry.attackRange)
        }
    }
}, {} as { [key in WeaponTypeID]: Status });
