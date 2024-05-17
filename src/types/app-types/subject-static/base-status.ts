import Decimal from "decimal.js";
import Status from "dictionary/status.json";
import { SubjectID } from "./id";

type BaseStatusType = {
    maxHP: Decimal,
    maxHPperLevel: Decimal,
    maxSP: Decimal,
    maxSPperLevel: Decimal,
    hpRegeneration: Decimal,
    hpRegenPerLevel: Decimal,
    spRegeneration: Decimal,
    spRegenPerLevel: Decimal,
    attackPower: Decimal,
    apPerLevel: Decimal,
    armor: Decimal,
    armorPerLevel: Decimal,
    attackSpeed: Decimal,
    movementSpeed: Decimal
};

export function baseStatus(id: SubjectID): BaseStatusType {
    const raw = (Status as {[index: string]: any})[id];
    return Object.keys(raw).reduce((prev, key) => {
        return {...prev, [key]: new Decimal(raw[key])};
    }, {}) as BaseStatusType;
}
