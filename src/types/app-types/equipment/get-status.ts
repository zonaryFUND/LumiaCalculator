import Decimal from "decimal.js";
import { EquipmentID } from "./id";
import { EquipmentStatus, PerLevelStatus } from "./status";
import { parseEquipmentAbility } from "./ability";
import Weapons from "dictionary/weapons.json";
import Armors from "dictionary/armors.json";

var statusCache = {} as {[id: string]: EquipmentStatus}

export function equipmentStatus(id: EquipmentID): EquipmentStatus {
    if (statusCache[id] != undefined) return statusCache[id];

    const raw = (Weapons as {[index: string]: any})[id] ?? (Armors as {[index: string]: any})[id];
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
        option: raw.option ? parseEquipmentAbility(raw.option) : undefined
    }
    const status = [
        "attackPower", "attackSpeed", "criticalChance", "criticalDamage", "skillAmplification", "ampRatio", "adaptiveStatus", "cooldownReduction", "cdrCap", "defense",
        "skillDamageReduction", "omnisyphon", "lifeSteal", "maxHP", "maxSP", "hpRegeneration", "spRegeneration", "armorPenetrationRatio", "armorPenetration",
        "healingPower", "movementSpeed", "attackRange", "vision", "tenacity", "ammo"
    ].reduce((prev, key) => {
        if (raw[key] == undefined) return prev;
        (prev as {[id: string]: any})[key] = new Decimal(raw[key]);
        return prev;
    }, base);

    statusCache[id] = status;
    return status;
}