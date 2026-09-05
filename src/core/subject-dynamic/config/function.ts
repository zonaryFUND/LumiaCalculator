import { meleeOrRange, WeaponTypeID } from "core/equipment/weapon";
import { SubjectConfig } from "./type";
import { EquipmentStatusDictionary } from "core/equipment";
import { WeaponMasteryStatus } from "core/subject-static";
import { SubjectWeaponRangeOverrideDictionary } from "@app/ingame-params/subjects/dictionary";

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
 * 基本規則: 装備できる武器種の近接/遠隔区分＝実験体の近接/遠隔区分（未装備でも適用）。ほぼすべての実験体は
 * 装備可能な武器種が近接/遠隔いずれか一方のみのため、これで一意に決まる。
 *
 * 例外は`SubjectWeaponRangeOverrideDictionary`（`ingame-params/subjects/dictionary.ts`。
 * `SubjectModules.weaponRangeOverride`参照）経由で個別に定義する:
 * - アデラ・ティア: 近接武器のみ装備可能だが常に遠隔実験体として扱う
 * - アレックス: 近接・遠隔両方の武器を装備できる唯一の実験体。装備中は現在の武器種で基本規則通り
 *   一意に決まるが、未装備時のデフォルト（近接）だけ上書きが必要
 * - イレム・シルヴィア: 能動的に近接/遠隔モードを切り替える変身型実験体（`config.selfBuffs`の現在の
 *   フォームで判定）。ただし武器未装備の場合は、フォームによらず近接扱いになる
 *
 * デビー＆マーリン・ヴァーニャ（変身型だが基本規則のまま正しい）はoverrideを持たない
 *
 * @param config
 * @returns `melee`（近接）または`range`（遠隔）
 */
export function weaponRangeOf(config: SubjectConfig): "melee" | "range" {
    const override = SubjectWeaponRangeOverrideDictionary[config.subject]?.(config);
    if (override != undefined) return override;

    if (config.equipment.Weapon != null) {
        return meleeOrRange(EquipmentStatusDictionary[config.equipment.Weapon].type as WeaponTypeID);
    }

    // 未装備時は、その実験体が装備可能な武器種（アレックス以外は近接/遠隔いずれか一方に統一されている）
    // から近接/遠隔を判定する
    const availableWeaponType = Object.keys(WeaponMasteryStatus[config.subject] ?? {})[0] as WeaponTypeID | undefined;
    return availableWeaponType ? meleeOrRange(availableWeaponType) : "melee";
}