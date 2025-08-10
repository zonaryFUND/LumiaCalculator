import Decimal from "decimal.js";
import { EquipmentBaseStatus, EquipmentSkill, EquipmentStatus, IsPercentExpressedEquipmentStatusKey } from "./status";
import { NimbleAPIJSON, FabricatedJSON } from "@params-json";
import { WeaponTypeID } from "./weapon"
import * as es from "es-toolkit/object"
import { ValueRatio } from "app-types/value-ratio";
import { EquipmentID } from "./id";

function correctPercentExpressedValueAndMapToDecimal(status: Partial<Record<keyof EquipmentBaseStatus, number>>): Partial<EquipmentBaseStatus> {
    return es.mapValues(status, (value, key) => {
        if (typeof value != "number") return value;
        return new Decimal(value).times(IsPercentExpressedEquipmentStatusKey(key) ? 100 : 1);
    });
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

const [
    weaponTypeCodes,
    weaponStatusDictionary
] = (() => {
    const [codes, statusDictionary] = NimbleAPIJSON.WeaponStatus.reduce(([codes, status], entry) => {
        const {code, weaponType, ...extractedStatus} = entry;
        const valuesMapped = correctPercentExpressedValueAndMapToDecimal(extractedStatus);

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
                [entry.code]: {...valuesMapped, type: weaponType, skill: abilities(code.toString(), FabricatedJSON.WeaponAbility)} as EquipmentStatus
            }
        ]
    }, [
        {} as Record<WeaponTypeID, {code: number, tierRank: number}[]>,
        {} as Record<EquipmentID, EquipmentStatus>
    ]);

    const sortedCodes = es.mapValues(codes, tuple => {
        return tuple
            .toSorted((a, b) => a.tierRank - b.tierRank)
            .map(({code}) => code)
    })

    return [sortedCodes, statusDictionary];
})();

/**
 * 数字で表される武器IDを武器種ごとにまとめた配列Dictionary　リスト列挙用
 */
export const WeaponCodes = weaponTypeCodes;

/**
 * 英雄等級以上の武器のステータス、固有アビリティ情報
 * 
 * Key: アイテムID
 */
export const WeaponStatusDictionary = weaponStatusDictionary;

const [
    headArmorCodes,
    chestArmorCodes,
    armArmorCodes,
    legArmorCodes,
    armorStatusDictionary,
    davidChestArmorUpgradeDictionary
] = (() => {
    const armors = NimbleAPIJSON.ArmorStatus.reduce(({headIDs, chestIDs, armIDs, legIDs, status}, entry) => {
        const {code, armorType, ...extractedStatus} = entry
        const valuesMapped = correctPercentExpressedValueAndMapToDecimal(extractedStatus);

        return {
            headIDs: entry.armorType == "Head" ? headIDs.concat(entry.code) : headIDs,
            chestIDs: entry.armorType == "Chest" ? chestIDs.concat(entry.code) : chestIDs,
            armIDs: entry.armorType == "Arm" ? armIDs.concat(entry.code) : armIDs,
            legIDs: entry.armorType == "Leg" ? legIDs.concat(entry.code) : legIDs,
            status: {
                ...status,
                [entry.code]: {...valuesMapped, type: armorType, skill: abilities(code.toString(), FabricatedJSON.ArmorAbility)} as EquipmentStatus
            }
        }
    }, {
        headIDs: [] as EquipmentID[],
        chestIDs: [] as EquipmentID[],
        armIDs: [] as EquipmentID[],
        legIDs: [] as EquipmentID[],
        status: {} as Record<EquipmentID, EquipmentStatus>
    });

    const davidUpgrade = Object.entries(FabricatedJSON.DavidUpgradeStatus).reduce((prev, jsonTuple) => {
        const status = Object.entries(jsonTuple[1]).reduce((prev, [key, value]) => {
            if (key == "code" || typeof value != "number") {
                return prev;
            } else {
                return {...prev, [key]: new Decimal(value)};
            }
        }, {} as Record<keyof EquipmentBaseStatus, Decimal>);
        
        return {...prev, [+jsonTuple[0]]: status}
    }, {} as Record<EquipmentID, Record<keyof EquipmentBaseStatus, Decimal>>)
    
    return [
        armors.headIDs,
        armors.chestIDs,
        armors.armIDs,
        armors.legIDs,
        armors.status, 
        davidUpgrade
    ]
})();

/**
 * 数字で表される頭装備のID配列　リスト列挙用
 */
export const HeadArmorCodes = headArmorCodes;

/**
 * 数字で表される胴装備のID配列　リスト列挙用
 */
export const ChestArmorCodes = chestArmorCodes;

/**
 * 数字で表される腕装備のID配列　リスト列挙用
 */
export const ArmArmorCodes = armArmorCodes;

/**
 * 数字で表される足装備のID配列　リスト列挙用
 */
export const LegArmorCodes = legArmorCodes;

/**
 * 英雄等級以上の防具のステータス、固有アビリティ情報
 * 
 * Key: アイテムID
 */
export const ArmorStatusDictionary = armorStatusDictionary;

/**
 * 伝説等級以上の胴装備がマイのパッシブスキルでDavidにアップグレードされる際の上昇ステータス差分
 * 
 * Key: アップグレード元のアイテムID
 */
export const DavidChestArmorUpgradeDictionary = davidChestArmorUpgradeDictionary;

/**
 * 英雄等級以上の全装備のステータス、固有アビリティ情報
 * 
 * Key: アイテムID
 */
export const EquipmentStatusDictionary = {...WeaponStatusDictionary, ...ArmorStatusDictionary};
