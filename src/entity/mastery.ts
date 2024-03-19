import Decimal from "decimal.js";
import { WeaponTypeID } from "./equipment"
import { SubjectID } from "./subject"

import Json from "dict/mastery.json";

export type Mastery = {
    weapon: WeaponTypeID
    type: "basic_attack_amp" | "skill_amp" | "attack_power"
    value: Decimal
    attackSpeed: Decimal
}

export function mastery(id: SubjectID): Mastery[] {
    const raw = (Json as {[index: string]: any[]})[id];
    return raw.map(raw => ({
        weapon: raw.weapon,
        type: raw.type,
        value: new Decimal(raw.value),
        attackSpeed: new Decimal(raw.attackSpeed)
    }));
}