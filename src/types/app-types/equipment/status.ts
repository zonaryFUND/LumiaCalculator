import Decimal from "decimal.js";
import { WeaponTypeID } from "./weapon";
import { ArmorTypeID } from "./armor";
import { EquipmentAbility } from "./ability";

export type Tier = "epic" | "legendary" | "mythic";

export const PerLevelStatusKeys = [
    "attack_power", "skill_amp", "max_hp", "aa_amp"
] as const;

export type PerLevelStatus = {
    type: typeof PerLevelStatusKeys[number]
    value: Decimal
};

export type EquipmentStatus = {
    type: WeaponTypeID | ArmorTypeID
    tier: Tier
    perLevelStatus?: PerLevelStatus
    attackPower?: Decimal
    attackSpeed?: Decimal
    criticalChance?: Decimal
    criticalDamage?: Decimal
    skillAmplification?: Decimal
    ampRatio?: Decimal
    adaptiveStatus?: Decimal
    cooldownReduction?: Decimal
    cdrCap?: Decimal
    defense?: Decimal
    skillDamageReduction?: Decimal
    omnisyphon?: Decimal
    lifeSteal?: Decimal
    maxHP?: Decimal
    maxSP?: Decimal
    hpRegeneration?: Decimal
    spRegeneration?: Decimal
    armorPenetrationRatio?: Decimal
    armorPenetration?: Decimal
    movementSpeed?: Decimal
    attackRange?: Decimal
    vision?: Decimal
    tenacity?: Decimal
    healingPower?: Decimal
    ammo?: Decimal
    option?: EquipmentAbility[]
}
