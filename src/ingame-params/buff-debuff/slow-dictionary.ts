import { SubjectSlowSourcesDictionary } from "@app/ingame-params/subjects/dictionary";
import { EquipmentAbilitySlowSourcesDictionary } from "@app/ingame-params/equipment-abilities/dictionary";
import { WeaponSkillSlowSourcesDictionary } from "@app/ingame-params/weapon-skills/dictionary";
import { AugmentSlowSourcesDictionary } from "@app/ingame-params/augment/dictionary";

/**
 * `SlowSourceInfo`を1発生源1効果量に展開した、辞書UI表示用の行データ
 */
export type SlowDictionaryEntry = {
    sourceIntlID: string
    nameIntlID: string
    value: number
    valueLabel?: string
}

/**
 * 移動速度減少（スロウ）を持つ全発生源の一覧。`generic.slow`（`generic-slow.ts`）を追加したユーザーが
 * 「この%は何から受けるものか」を参照するための、計算には一切関与しないデータ。実験体固有スキル由来
 * （`SubjectSlowSourcesDictionary`）・装備アビリティ由来（`EquipmentAbilitySlowSourcesDictionary`）・
 * 特性由来（`AugmentSlowSourcesDictionary`）を集約済み。戦術スキルも同じ`SlowSourceInfo`を持たせられる
 * 設計にしてあるが、対応するモジュール側の宣言・ここでの集約はまだ未着手
 *
 * 特性は実験体スキル・武器スキルと異なり、`nameIntlID`（トレイト名。例:「金剛」）単体で発生源が一意に
 * 特定できるため、`sourceIntlID`は個々のトレイトではなく`TacticalSkillGivenBuffDebuff`と同様に
 * カテゴリ名（`"app.augment"`）で束ねる
 *
 * 効果量（`value`）昇順でソート済み。UI側はこの配列をそのまま並べるだけでよい
 */
export const SlowDictionary: SlowDictionaryEntry[] = [
    ...Object.entries(SubjectSlowSourcesDictionary)
        .flatMap(([subjectCode, sources]) => sources.flatMap(source =>
            source.values.map((value, i) => ({
                sourceIntlID: `Character/Name/${subjectCode}`,
                nameIntlID: source.nameIntlID,
                value,
                valueLabel: source.valueLabels?.[i]
            }))
        )),
    ...Object.entries(EquipmentAbilitySlowSourcesDictionary)
        .flatMap(([skillCode, sources]) => sources.flatMap(source =>
            source.values.map((value, i) => ({
                sourceIntlID: `Item/Skills/${skillCode}/Name`,
                nameIntlID: source.nameIntlID,
                value,
                valueLabel: source.valueLabels?.[i]
            }))
        )),
    ...Object.entries(WeaponSkillSlowSourcesDictionary)
        .flatMap(([skillCode, sources]) => sources.flatMap(source =>
            source.values.map((value, i) => ({
                sourceIntlID: `Skill/Group/Name/${skillCode}`,
                nameIntlID: source.nameIntlID,
                value,
                valueLabel: source.valueLabels?.[i]
            }))
        )),
    ...AugmentSlowSourcesDictionary.flatMap(source =>
        source.values.map((value, i) => ({
            sourceIntlID: "app.augment",
            nameIntlID: source.nameIntlID,
            value,
            valueLabel: source.valueLabels?.[i]
        }))
    )
].sort((a, b) => a.value - b.value);
