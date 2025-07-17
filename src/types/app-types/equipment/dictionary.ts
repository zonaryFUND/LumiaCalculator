import Decimal from "decimal.js";
import { EquipmentSkill, EquipmentStatus, EquipmentStatusKeys, EquipmentStatusValueKey, PercentExpressedEquipmentStatusKeys } from "./status";
import Weapons from "@app/ingame-params/json/weapon.json";
import WeaponSkill from "@app/ingame-params/json/weapon-skill.json";
import Armors from "@app/ingame-params/json/armor.json";
import DavidUpgrade from "@app/ingame-params/json/david-upgrade.json";
import ArmorSkill from "@app/ingame-params/json/armor-skill.json";
import { WeaponTypeID } from "./weapon"
import * as es from "es-toolkit/object"
import { ValueRatio } from "app-types/value-ratio";

function mapValues(key: EquipmentStatusValueKey, value: number) {
    const percentExpression = PercentExpressedEquipmentStatusKeys.includes(key);
    return new Decimal(value).times(percentExpression ? 100 : 1);
}

type ItemValueRatio = ValueRatio & {levelProp?: {from: number, to: number}}

type ItemSkillValues = {
    skillCode: number | number[]
    name: string | string[]
    dmg?: ItemValueRatio | {melee: ItemValueRatio, range: ItemValueRatio}
    values?: Record<string, unknown>
}

function abilities(itemCode: string, dictionary: Record<string, ItemSkillValues>): EquipmentSkill[] | undefined {
    if (itemCode in dictionary) {
        if (Array.isArray(dictionary[itemCode].skillCode)) {
            return (dictionary[itemCode].skillCode as number[]).map((code, i) => ({
                ...dictionary[itemCode],
                skillCode: code,
                name: dictionary[itemCode].name[i]
            }))
        } else {
            return [dictionary[itemCode] as EquipmentSkill]
        }
    }

    return undefined;
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
                [entry.code]: {...valuesMapped, type: weaponType, skill: abilities(code.toString(), WeaponSkill)} as EquipmentStatus
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
    ArmorStatusDictionary,
    DavidChestArmorUpgradeDictionary
] = (() => {
    const armors = Armors.reduce(({headIDs, chestIDs, armIDs, legIDs, status}, entry) => {
        const {code, armorType, ...extractedStatus} = entry
        const valuesMapped = es.mapValues(extractedStatus, (value, key) => {
            if (typeof value != "number") return value;
            return mapValues(key as EquipmentStatusValueKey, value);
        });

        return {
            headIDs: entry.armorType == "Head" ? headIDs.concat(entry.code) : headIDs,
            chestIDs: entry.armorType == "Chest" ? chestIDs.concat(entry.code) : chestIDs,
            armIDs: entry.armorType == "Arm" ? armIDs.concat(entry.code) : armIDs,
            legIDs: entry.armorType == "Leg" ? legIDs.concat(entry.code) : legIDs,
            status: {
                ...status,
                [entry.code]: {...valuesMapped, type: armorType, skill: abilities(code.toString(), ArmorSkill)} as EquipmentStatus
            }
        }
    }, {
        headIDs: [] as number[],
        chestIDs: [] as number[],
        armIDs: [] as number[],
        legIDs: [] as number[],
        status: {} as {[code: number]: EquipmentStatus}
    });

    const davidUpgrade = Object.entries(DavidUpgrade).reduce((prev, jsonTuple) => {
        const status = Object.entries(jsonTuple[1]).reduce((prev, [key, value]) => {
            if ((EquipmentStatusKeys).includes(key as any)) {
                return {...prev, [key]: new Decimal(value)};
            } else {
                return prev;
            }
        }, {} as {[key in EquipmentStatusValueKey]: Decimal});
        
        return {...prev, [+jsonTuple[0]]: status}
    }, {} as {[id: number]: {[key in EquipmentStatusValueKey]: Decimal}})
    
    return [
        armors.headIDs,
        armors.chestIDs,
        armors.armIDs,
        armors.legIDs,
        armors.status, 
        davidUpgrade
    ]
})();

export const EquipmentStatusDictionary = {...WeaponStatusDictionary, ...ArmorStatusDictionary};
