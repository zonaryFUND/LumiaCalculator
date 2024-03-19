import Decimal from "decimal.js"
import Weapon from "dict/weapons.json"
import Armor from "dict/armors.json";
import { EquipmentID } from "./equipment-id"

export type WeaponTypeID = "vf_prosthetic" | "arcana" | "camera" | "guitar" | "glove" | "tonfa" | "bat" | "rapier" | "shuriken" | "bow" |
    "hammer" | "pistol" | "crossbow" | "sniper_rifle" | "dual_swords" | "nunchaku" | "spear" | "dagger" | "throw" | "assault_rifle" | 
    "axe" | "whip" | "two-handed_sword"

export type ArmorTypeID = "chest" | "head" | "arm" | "leg"

export type Tier = "epic" | "legendary" | "mythic"

export type PerLevelStatus = {
    type: "attack_power" | "skill_amp" | "max_hp" | "aa_amp"
    value: Decimal
}

export type EquipmentStatus = {
    type: WeaponTypeID | ArmorTypeID
    tier: Tier
    perLevelStatus?: PerLevelStatus
    attackPower?: Decimal
    attackSpeed?: Decimal
    criticalChance?: Decimal
    criticalDamage?: Decimal
    skillAmplification?: Decimal
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
    ammo?: Decimal
    option?: String
}

var equipmentCache = {} as {[id: string]: EquipmentStatus}

export function equipmentStatus(id: EquipmentID): EquipmentStatus {
    if (equipmentCache[id] != undefined) return equipmentCache[id];

    const raw = (Weapon as {[index: string]: any})[id] ?? (Armor as {[index: string]: any})[id];
    const perLevelStatus: PerLevelStatus | undefined = (() => {
        if (!raw.perLevelStatus) return undefined;
        
        if (raw.perLevelStatus == "ad")  {
            return { type: "attack_power", value: new Decimal(3)};
        } else if (raw.perLevelStatus == "ap") {
            return { type: "skill_amp", value: new Decimal(5)};
        } else {
            const match = (raw.perLevelStatus as string).match(/^(.+)\[(\d+(\.\d+)?)\]$/)!;
            return { type: match[1] == "hp" ? "max_hp" : "aa_amp", value: new Decimal(parseFloat(match[2])) };
        }
    })();
    const base: EquipmentStatus = {
        type: raw.type,
        tier: raw.tier,
        perLevelStatus,
        option: raw.option
    }
    const status = [
        "attackPower", "attackSpeed", "criticalChance", "criticalDamage", "skillAmplification", "ampRatio", "adaptiveStatus", "cooldownReduction", "cdrCap", "defense",
        "skillDamageReduction", "omnisyphon", "lifeSteal", "maxHP", "maxSP", "hpRegeneration", "spRegeneration", "armorPenetrationRatio", "armorPenetration",
        "movementSpeed", "attackRange", "vision", "tenacity", "ammo"
    ].reduce((prev, key) => {
        if (raw[key] == undefined) return prev;
        (prev as {[id: string]: any})[key] = new Decimal(raw[key]);
        return prev;
    }, base);
    equipmentCache[id] = status;

    return status;
}

import BaseStatusJSON from "dict/weapon-type-status.json"

type WeaponBaseStatus = {
    attackSpeed: Decimal
    range: Decimal
}

export function weaponBaseStatus(id: WeaponTypeID): WeaponBaseStatus {
    const raw = (BaseStatusJSON as {[index: string]: any})[id];
    return Object.keys(raw).reduce((prev, key) => {
        return {...prev, [key]: new Decimal(raw[key])};
    }, {}) as WeaponBaseStatus;
}