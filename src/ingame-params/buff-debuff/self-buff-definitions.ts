import { BuffDebuffState, SubjectConfig, weaponTypeIDOf } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { EquipmentStatusDictionary } from "core/equipment";
import { SubjectBuffDebuffDictionary } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilityBuffDebuffDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { WeaponSkillBuffDebuffDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { selectableSelfBuffCatalogOf } from "./selectable-self-buff-catalog";
import { BuffDebuffDefinition } from "./type";

/**
 * `config.selfBuffs`のうち、実験体・装備の選択に応じて自動的に投入・削除される定義一覧
 * （`origin: "skill" | "equipment-ability"`）。実験体固有スキル由来（`SubjectBuffDebuffDictionary`）、
 * 装備中の武器種由来（`WeaponSkillBuffDebuffDictionary`）、現在の装備アビリティ由来
 * （`EquipmentAbilityBuffDebuffDictionary`）をすべてマージして返す。`reconcileSelfBuffs`が「実験体・装備の
 * 変更時に自動投入・削除してよい対象」を判別するために参照する（ユーザーが選択して追加・削除する
 * `augment`/`tactical-skill`/`misc`由来の定義は`selectableSelfBuffCatalogOf`側にあり、ここには
 * 含まれない）
 *
 * @param status 効果量が実験体の現在のステータス（例: スキル増幅の値）にも依存する自己バフのために渡す。
 * `statusOf()`から呼ぶ場合は自己バフを含まない中間状態のStatus（循環を避けるため）、UI表示目的で呼ぶ場合は
 * Storeの最終Statusで構わない（`self-buffs.tsx`参照）
 */
function autoSelfBuffDefinitionsOf(config: SubjectConfig, status: Status): Record<string, BuffDebuffDefinition> {
    const subjectDefinitions = SubjectBuffDebuffDictionary[config.subject]?.(config, status) ?? {};

    // 武器スキルは1武器種につき1モジュールで一意（装備アビリティのように複数アイテムが1skillCodeを
    // 共有することがない）ため、装備中の武器種を引いて定義を取得するだけでよく、名前空間の付与は不要
    const weaponType = weaponTypeIDOf(config);
    const weaponDefinitions = weaponType ? (WeaponSkillBuffDebuffDictionary[weaponType]?.(config, status) ?? {}) : {};

    // 装備アビリティが返すidは、そのアビリティ内でのみ一意な「ローカルid」（EquipmentAbilityImportedProps
    // 参照）。同一skillCodeを複数アイテムが共有し、かつアイテムごとに内容が異なることがあるため、
    // ここ（アイテムを実際に列挙している側）でitemIDを名前空間として付与し、グローバルな一意性を担保する
    const { isChestDavid, ...equipment } = config.equipment;
    const equipmentDefinitions = Object.values(equipment)
        .flatMap(itemID => {
            if (itemID == null) return [];
            return (EquipmentStatusDictionary[itemID].skill ?? [])
                .flatMap(ability => {
                    const entry = EquipmentAbilityBuffDebuffDictionary[ability.skillCode];
                    if (!entry) return [];
                    const definitions = entry({ config, status, importedDamage: ability.dmg, importedValues: ability.values });
                    return Object.entries(definitions).map(([localId, def]) => [`${itemID}:${localId}`, def] as const);
                });
        })
        .reduce((prev, [id, def]) => ({ ...prev, [id]: def }), {} as Record<string, BuffDebuffDefinition>);

    return { ...subjectDefinitions, ...weaponDefinitions, ...equipmentDefinitions };
}

/**
 * `config.selfBuffs`のid解決に使う定義一覧全体。自動投入・削除される定義（`autoSelfBuffDefinitionsOf`）に、
 * ユーザーが選択して追加・削除する定義（`selectableSelfBuffCatalogOf`。特性・戦術スキル・オブジェクト討伐）
 * をマージして返す。`statusOf()`・`self-buffs.tsx`の両方から共通で参照する（発生源が増えるたびに個別に
 * 書くと、一方だけ更新し忘れて自己バフが計算には反映されるのにUIに出ない、といった食い違いが起きるため）
 */
export function selfBuffDefinitionsOf(config: SubjectConfig, status: Status): Record<string, BuffDebuffDefinition> {
    return { ...autoSelfBuffDefinitionsOf(config, status), ...selectableSelfBuffCatalogOf(config, status) };
}

/**
 * 現在のconfig（実験体・装備）から導出される「あるべきselfBuffs」を計算する。既存の`config.selfBuffs`に
 * 一致するidがあればそのstackを保持し、新たに存在するidはstack 0で追加、もう存在しないidは取り除く。
 *
 * 実験体・装備の変更時（`setSubject`/`setEquipment`）だけでなく、localStorageから復元した直後
 * （persistの`merge`）にも呼び出す。復元直後に呼ばないと、「保存済みビルドの実験体に、保存後のアップデートで
 * 新しい自己バフ定義が追加された」場合に、次回起動時もselfBuffsが古いまま（空、または一部欠けたまま）に
 * なってしまう（実験体・装備を選び直すまで一切投入されない）
 *
 * @param status 呼び出し側（`store.tsx`）が`statusOf(config, 100)`で計算したものを渡す
 * （このファイルは`calculation.ts`をimportできない。`calculation.ts`が既に`selfBuffDefinitionsOf`を
 * importしており循環importになるため）。ここでは「どんなidが存在しうるか」というキー集合の算出にしか
 * 使わないため、多少古いStatusでも実害はない
 */
export function reconcileSelfBuffs(config: SubjectConfig, status: Status): BuffDebuffState[] {
    const autoDefinitions = autoSelfBuffDefinitionsOf(config, status);
    const reconciledAuto = Object.keys(autoDefinitions).map(id =>
        config.selfBuffs.find(s => s.id == id) ?? { id, stack: 0 }
    );

    // 特性・戦術スキル・オブジェクト討伐由来（`autoDefinitions`に含まれない = origin: "skill" |
    // "equipment-ability"ではない）の自己バフは、ユーザーが自らincomingBuffsと同様に追加・削除するもので
    // あり、実験体・装備の変更に連動して自動投入・削除してはいけないため、既存の要素をそのまま保持する
    const preservedSelectable = config.selfBuffs.filter(s => autoDefinitions[s.id] == undefined);

    return [...reconciledAuto, ...preservedSelectable];
}
