import { EquipmentID, EquipmentStatusDictionary } from "core/equipment";
import { SubjectIncomingBuffDebuffSubjectCode } from "@app/ingame-params/subjects/dictionary";

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
 * 実験体スキル由来なら`Character/Name/{subjectCode}`、装備アビリティ由来ならid自体に含まれる
 * 名前空間（`itemIDFromNamespacedId`）から`Item/Name/{itemID}`を組み立てる。どちらにも該当しなければ
 * `undefined`（発生源不明。基本的に起こらない想定）
 *
 * 自己バフと異なり、他者バフは発生源が実験体選択に紐付かない（任意の敵から受けうる）ため、
 * 常に発生源名を表示する（`buff-row.view.tsx`の`sourceIntlID`）
 */
export function incomingBuffSourceIntlID(id: string): string | undefined {
    const subject = SubjectIncomingBuffDebuffSubjectCode[id];
    if (subject != undefined) return `Character/Name/${subject}`;

    const itemID = itemIDFromNamespacedId(id);
    return itemID != undefined ? `Item/Name/${itemID}` : undefined;
}
