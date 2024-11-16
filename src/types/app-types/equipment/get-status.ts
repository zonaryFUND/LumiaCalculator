import Decimal from "decimal.js";
import { EquipmentStatus, EquipmentStatusValueKey, PercentExpressedEquipmentStatusKeys } from "./status";
import Weapons from "dictionary/weapon.json";
import Armors from "dictionary/armor.json";
import { WeaponTypeID } from "./weapon"
import * as es from "es-toolkit/object"

function mapValues(key: EquipmentStatusValueKey, value: number) {
    const percentExpression = PercentExpressedEquipmentStatusKeys.includes(key);
    return new Decimal(value).times(percentExpression ? 100 : 1);
}

export const [
    WeaponTypeCodes,
    WeaponStatusDictionary
] = (() => {
    const [codes, statusDictionary] = Weapons.reduce(([codes, status], entry) => {
        const {code, weaponType, ...extractedStatus} = entry;
        const valuesMapped = es.mapValues(extractedStatus, (value, key) => {
            if (typeof value != "number") return value;
            return mapValues(key as EquipmentStatusValueKey, value);
        });

        const tierRank = (() => {
            switch (extractedStatus.itemGrade) {
                case "Epic": return 0;
                case "Legend": return 1;
                case "Mythic": return 2;
                default: throw new Error("unexpected itemGrade found");
            }
        })();
    
        return [
            {
                ...codes,
                [entry.weaponType]: (codes[weaponType as WeaponTypeID] ?? []).concat({ code: entry.code, tierRank })
            },
            {
                ...status,
                [entry.code]: {...valuesMapped, type: weaponType} as EquipmentStatus
            }
        ]
    }, [
        {} as {[typeID in WeaponTypeID]: {code: number, tierRank: number}[]},
        {} as {[code: number]: EquipmentStatus}
    ]);

    const sortedCodes = es.mapValues(codes, tuple => {
        return tuple
            .toSorted((a, b) => a.tierRank - b.tierRank)
            .map(({code}) => code)
    })

    return [sortedCodes, statusDictionary];
})();



export const [
    HeadArmorCodes,
    ChestArmorCodes,
    ArmArmorCodes,
    LegArmorCodes,
    ArmorStatusDictionary
] = (() => {
    return Armors.reduce(([headIDs, chestIDs, armIDs, legIDs, status], entry) => {
        const {code, armorType, ...extractedStatus} = entry
        const keysSanitized = es.mapKeys(extractedStatus, (_, key) => key == "skillAmpByLevel" ? "skillAmpByLv" : key);
        const valuesMapped = es.mapValues(keysSanitized, (value, key) => {
            if (typeof value != "number") return value;
            return mapValues(key as EquipmentStatusValueKey, value);
        });

        return [
            entry.armorType == "Head" ? headIDs.concat(entry.code) : headIDs,
            entry.armorType == "Chest" ? chestIDs.concat(entry.code) : chestIDs,
            entry.armorType == "Arm" ? armIDs.concat(entry.code) : armIDs,
            entry.armorType == "Leg" ? legIDs.concat(entry.code) : legIDs,
            {
                ...status,
                [entry.code]: {...valuesMapped, type: armorType} as EquipmentStatus
            }
        ]
    }, [
        [] as number[],
        [] as number[],
        [] as number[],
        [] as number[],
        {} as {[code: number]: EquipmentStatus}
    ]);
})();

export const EquipmentStatusDictionary = {...WeaponStatusDictionary, ...ArmorStatusDictionary};

/*
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
    */