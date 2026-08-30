import { SubjectConfig } from "core/subject-dynamic/config";
import { EquipmentStatusDictionary } from "core/equipment";
import { SubjectBuffDebuffDictionary } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityBuffDebuffDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { BuffDebuffDefinition } from "./type";

/**
 * `config.selfBuffs`のid解決に使う定義一覧。実験体固有スキル由来（`SubjectBuffDebuffDictionary`）と、
 * 現在の装備アビリティ由来（`EquipmentAbilityBuffDebuffDictionary`）の両方をマージして返す。
 * `statusOf()`・`self-buffs.tsx`の両方から共通で参照する（発生源が増えるたびに個別に書くと、
 * 一方だけ更新し忘れて自己バフが計算には反映されるのにUIに出ない、といった食い違いが起きるため）
 */
export function selfBuffDefinitionsOf(config: SubjectConfig): Record<string, BuffDebuffDefinition> {
    const subjectDefinitions = SubjectBuffDebuffDictionary[config.subject]?.(config) ?? {};

    const { isChestDavid, ...equipment } = config.equipment;
    const equipmentDefinitions = Object.values(equipment)
        .flatMap(itemID => {
            if (itemID == null) return [];
            return (EquipmentStatusDictionary[itemID].skill ?? [])
                .flatMap(ability => {
                    const entry = EquipmentAbilityBuffDebuffDictionary[ability.skillCode];
                    return entry ? [entry(config)] : [];
                });
        })
        .reduce((prev, dict) => ({ ...prev, ...dict }), {});

    return { ...subjectDefinitions, ...equipmentDefinitions };
}
