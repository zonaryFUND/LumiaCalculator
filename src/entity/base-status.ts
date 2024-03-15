import Decimal from "decimal.js";

export type BaseStatus = {
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