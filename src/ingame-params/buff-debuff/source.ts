import { EquipmentID, EquipmentStatusDictionary } from "core/equipment";
import { SubjectConfig } from "core/subject-dynamic/config";
import { EquipmentAbilityBuffDebuffDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { SubjectIncomingBuffDebuffSubjectCode } from "@app/ingame-params/subjects/dictionary";
import { IncomingBuffDebuffCatalog } from "./incoming-catalog";

/**
 * 他者バフ・デバフ（`IncomingBuffDebuffCatalog`のid）の発生源表示名を解決するためのIntlメッセージID。
 * 実験体スキル由来なら`Character/Name/{subjectCode}`、装備アビリティ由来なら定義の`sourceItems`
 * （著者が直接指定した発生源アイテムID一覧。複数あれば連結表示する）から`Item/Name/{itemID}`を組み立てる。
 * どちらにも該当しなければ`undefined`（発生源不明。基本的に起こらない想定）
 *
 * 自己バフと異なり、他者バフは発生源が実験体選択に紐付かない（任意の敵から受けうる）ため、
 * 常に発生源名を表示する（`buff-row.view.tsx`の`sourceIntlID`）
 */
export function incomingBuffSourceIntlID(id: string): string | undefined {
    const subject = SubjectIncomingBuffDebuffSubjectCode[id];
    if (subject != undefined) return `Character/Name/${subject}`;

    const sourceItems = IncomingBuffDebuffCatalog[id]?.sourceItems;
    if (!sourceItems || sourceItems.length == 0) return undefined;

    return sourceItems.map(itemID => `Item/Name/${itemID}`).join(" / ");
}

/**
 * 現在装備しているアイテムのうち、自己バフidを供給しているアイテムのIDを引く。
 * 実験体固有スキル由来（`origin: "skill"`）の自己バフは発生源が選択中の実験体自身であり自明なため、
 * 表示名解決の対象外（呼び出し側でorigin判定して使い分ける）。
 *
 * 他者バフと異なり、実際に装備しているアイテムを直接辿るため`sourceItems`（著者の申告）には依存しない
 * （1つのskillCodeを複数アイテムが共有していても、または装備ごとに効果量が異なっていても、実際に
 * 装備しているアイテムはconfig.equipmentから一意に決まる）
 */
export function equipmentSelfBuffSourceOf(config: SubjectConfig): Record<string, EquipmentID> {
    const { isChestDavid, ...equipment } = config.equipment;
    return Object.values(equipment)
        .flatMap(itemID => {
            if (itemID == null) return [];
            return (EquipmentStatusDictionary[itemID].skill ?? [])
                .flatMap(ability => {
                    const entry = EquipmentAbilityBuffDebuffDictionary[ability.skillCode];
                    if (!entry) return [];
                    return Object.keys(entry(config)).map(id => [id, itemID] as const);
                });
        })
        .reduce((prev, [id, itemID]) => ({ ...prev, [id]: itemID }), {} as Record<string, EquipmentID>);
}
