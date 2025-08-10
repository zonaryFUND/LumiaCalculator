import { meleeOrRange, WeaponTypeID } from "app-types/equipment/weapon";
import { SubjectConfig } from "./type";
import { EquipmentStatusDictionary } from "app-types/equipment";
import { WeaponMasteryStatus } from "app-types/subject-static";

/**
 * 実験体設定から現在装備中の武器種IDを抽出する
 * 
 * @param config 
 * @returns 武器種（未装備ならundefined）
 */
export function weaponTypeIDOf(config: SubjectConfig): WeaponTypeID | undefined {
    if (config.equipment.Weapon == undefined) return undefined;

    return EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID;
}

/**
 * 適合型能力値が攻撃力とスキル増幅どちらに変換されるか
 * 
 * @param config 実験体設定構造体
 * @returns `attackPower`（攻撃力）または`skillAmp`（スキル増幅）
 */
export function adaptiveForceTargetOf(config: SubjectConfig): "attackPower" | "skillAmp" {
    const weapon = weaponTypeIDOf(config);
    if (weapon == undefined) return "attackPower";
    return WeaponMasteryStatus[config.subject][weapon]?.type == "skill_amp" ? "skillAmp" : "attackPower";
}

/**
 * 対象の実験体が現在近接として扱われるか遠隔として扱われるか
 * 
 * @param config 
 * @returns `melee`（近接）または`range`（遠隔）
 */
export function weaponRangeOf(config: SubjectConfig): "melee" | "range" {
    if (config.subject == 24) {
        return "range";
    }

    if (config?.equipment.Weapon == null) return "melee";
    return meleeOrRange(EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID)
}