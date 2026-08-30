import { BuffDebuffState, SubjectConfig } from "core/subject-dynamic/config";
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

/**
 * 現在のconfig（実験体・装備）から導出される「あるべきselfBuffs」を計算する。既存の`config.selfBuffs`に
 * 一致するidがあればそのstackを保持し、新たに存在するidはstack 0で追加、もう存在しないidは取り除く。
 *
 * 実験体・装備の変更時（`setSubject`/`setEquipment`）だけでなく、localStorageから復元した直後
 * （persistの`merge`）にも呼び出す。復元直後に呼ばないと、「保存済みビルドの実験体に、保存後のアップデートで
 * 新しい自己バフ定義が追加された」場合に、次回起動時もselfBuffsが古いまま（空、または一部欠けたまま）に
 * なってしまう（実験体・装備を選び直すまで一切投入されない）
 */
export function reconcileSelfBuffs(config: SubjectConfig): BuffDebuffState[] {
    const definitions = selfBuffDefinitionsOf(config);
    return Object.keys(definitions).map(id =>
        config.selfBuffs.find(s => s.id == id) ?? { id, stack: 0 }
    );
}
