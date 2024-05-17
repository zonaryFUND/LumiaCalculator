import Decimal from "decimal.js";
import TypeStatus from "dictionary/weapon-type-status.json"
import { WeaponTypeID } from "./type-id";

type WeaponTypeStatus = {
    attackSpeed: Decimal
    range: Decimal
}

export function weaponTypeStatus(id: WeaponTypeID): WeaponTypeStatus {
    const raw = (TypeStatus as {[index: string]: any})[id];
    return Object.keys(raw).reduce((prev, key) => {
        return {...prev, [key]: new Decimal(raw[key])};
    }, {}) as WeaponTypeStatus;
}

