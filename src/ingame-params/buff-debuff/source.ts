import { EquipmentID, EquipmentStatusDictionary } from "core/equipment";
import { SubjectConfig } from "core/subject-dynamic/config";
import { EquipmentAbilityBuffDebuffDictionary, EquipmentAbilityIncomingBuffDebuffSkillCode } from "@app/ingame-params/equipment-abilities/dictionary";
import { SubjectIncomingBuffDebuffSubjectCode } from "@app/ingame-params/subjects/dictionary";

// 全アイテムを対象に、装備アビリティのskillCodeからそれを持つアイテムIDを逆引きする。同一skillCodeを
// 複数アイテムが持つ場合もありうる（例: 同名スキルを持つ複数装備）ため配列で持つが、表示上は先頭の1件のみ
// 採用する（他者バフ・デバフ一覧の表示名解決という用途上、致命的な精度は求められないため）
const itemsBySkillCode: Record<number, EquipmentID[]> = Object.entries(EquipmentStatusDictionary)
    .reduce((prev, [id, status]) => {
        return (status.skill ?? []).reduce((prev, ability) => ({
            ...prev,
            [ability.skillCode]: [...(prev[ability.skillCode] ?? []), Number(id)]
        }), prev);
    }, {} as Record<number, EquipmentID[]>);

/**
 * 他者バフ・デバフ（`IncomingBuffDebuffCatalog`のid）の発生源表示名を解決するためのIntlメッセージID。
 * 実験体スキル由来なら`Character/Name/{subjectCode}`、装備アビリティ由来なら`Item/Name/{itemID}`。
 * どちらにも該当しなければ`undefined`（発生源不明。基本的に起こらない想定）
 *
 * 自己バフと異なり、他者バフは発生源が実験体選択に紐付かない（任意の敵から受けうる）ため、
 * 常に発生源名を表示する（`buff-row.view.tsx`の`sourceIntlID`）
 */
export function incomingBuffSourceIntlID(id: string): string | undefined {
    const subject = SubjectIncomingBuffDebuffSubjectCode[id];
    if (subject != undefined) return `Character/Name/${subject}`;

    const skillCode = EquipmentAbilityIncomingBuffDebuffSkillCode[id];
    const itemID = skillCode != undefined ? itemsBySkillCode[skillCode]?.[0] : undefined;
    return itemID != undefined ? `Item/Name/${itemID}` : undefined;
}

/**
 * 現在装備しているアイテムのうち、自己バフidを供給しているアイテムのIDを引く。
 * 実験体固有スキル由来（`origin: "skill"`）の自己バフは発生源が選択中の実験体自身であり自明なため、
 * 表示名解決の対象外（呼び出し側でorigin判定して使い分ける）
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
