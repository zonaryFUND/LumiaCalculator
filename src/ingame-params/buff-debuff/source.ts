import { EquipmentID, EquipmentStatusDictionary } from "core/equipment";
import { SubjectIncomingBuffDebuffSubjectCode } from "@app/ingame-params/subjects/dictionary";
import { WeaponSkillIncomingBuffDebuffWeaponType } from "@app/ingame-params/weapon-skills/dictionary";
import { AugmentGivenBuffDebuff } from "@app/ingame-params/augment/buff-debuff";
import { TacticalSkillGivenBuffDebuff } from "@app/ingame-params/tactical-skill/buff-debuff";

/**
 * 装備アビリティ由来のバフ・デバフidから、名前空間として付与された発生源アイテムIDを取り出す
 * （`self-buff-definitions.ts`・`equipment-abilities/dictionary.ts`の`${itemID}:${localId}`形式を前提とする）。
 * 実験体スキル由来のidはこの形式を持たないため`undefined`を返す
 */
export function itemIDFromNamespacedId(id: string): EquipmentID | undefined {
    const itemID = Number(id.split(":")[0]);
    return Number.isFinite(itemID) && EquipmentStatusDictionary[itemID] != undefined ? itemID : undefined;
}

/**
 * 他者バフ・デバフ（`IncomingBuffDebuffCatalog`のid）の発生源表示名を解決するためのIntlメッセージID。
 * 実験体スキル由来なら`Character/Name/{subjectCode}`、武器スキル由来なら`MasteryType/{武器種}`
 * （装備選択モーダルで武器種名の表示に使っているのと同じキー）、特性由来なら`app.augment`、戦術スキル由来
 * なら`app.tactical-skill`、装備アビリティ由来ならid自体に含まれる名前空間（`itemIDFromNamespacedId`）から
 * `Item/Name/{itemID}`を組み立てる。いずれにも該当しなければ`undefined`（発生源不明。基本的に起こらない想定）
 *
 * 特性・戦術スキルは（実験体スキル・武器種のような）サブディレクトリ単位のカタログではなく
 * `AugmentGivenBuffDebuff`・`TacticalSkillGivenBuffDebuff`という単一の定数カタログのため、他の発生源のような
 * 「id→発生源」の中間マップは持たず、直接idの所属を確認する。個々の特性・戦術スキル名は`nameIntlID`
 * （例:「絶対武力」「プロトコル違反 Lv.1」）が既に一意に表しているため、ここで解決する`app.augment`・
 * `app.tactical-skill`はあくまで「特性/戦術スキル由来である」というカテゴリ名の付与に留まる
 *
 * 自己バフと異なり、他者バフは発生源が実験体選択に紐付かない（任意の味方・敵から受けうる）ため、
 * 常に発生源名を表示する（`buff-row.view.tsx`の`sourceIntlID`）
 */
export function incomingBuffSourceIntlID(id: string): string | undefined {
    const subject = SubjectIncomingBuffDebuffSubjectCode[id];
    if (subject != undefined) return `Character/Name/${subject}`;

    const weaponType = WeaponSkillIncomingBuffDebuffWeaponType[id];
    if (weaponType != undefined) return `MasteryType/${weaponType}`;

    if (AugmentGivenBuffDebuff[id] != undefined) return "app.augment";

    if (TacticalSkillGivenBuffDebuff[id] != undefined) return "app.tactical-skill";

    const itemID = itemIDFromNamespacedId(id);
    return itemID != undefined ? `Item/Name/${itemID}` : undefined;
}
