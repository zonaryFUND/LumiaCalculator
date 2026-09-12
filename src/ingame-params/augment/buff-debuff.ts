import { BuffDebuffDefinition } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";
import { HavocBuffDebuff, HavocGivenBuffDebuff } from "./havoc-buff-debuff";
import { ChaosBuffDebuff, ChaosGivenBuffDebuff } from "./chaos-buff-debuff";
import { FortificationBuffDebuff, FortificationGivenBuffDebuff } from "./fortification-buff-debuff";
import { SupportBuffDebuff, SupportGivenBuffDebuff } from "./support-buff-debuff";

/**
 * 特性由来の選択式自己バフ（`origin: "augment"`）。ユーザーが`self-buffs.tsx`の追加UIから任意に選択する
 * （`selectable-self-buff-catalog.ts`参照）。
 *
 * 特性は4カテゴリ（破壊系`havoc.ts`・カオス系`chaos.ts`・抵抗系`fortification.ts`・サポート系`support.ts`）に
 * 分かれ、それぞれの効果は`<category>-buff-debuff.ts`（`havoc-buff-debuff.ts`等）に定義されている。
 * このファイルはそれらを集約して1つの辞書にまとめるだけの役割で、個々の特性の実装（`buff`関数の中身、
 * l10nキーの選定など）は持たない。カテゴリごとに分割した理由: 当初は本ファイル1つに全特性を実装する
 * 想定だったが、各特性の効果が想定より複雑（現在体力依存の効果、装備等級による自動判定など）で
 * 1ファイルに収めると見通しが悪くなるため
 *
 * @param status 効果量が実験体の現在のステータス（例:「渦流」の回復量）にも依存する特性のために渡す
 * （`SubjectSelfBuffDebuff`と同様。`selectable-self-buff-catalog.ts`参照）
 * @param currentHPRatio 自身の現在体力割合（％）。`SubjectPerpetualStatus`・`EquipmentAbilityPerpetualStatus`
 * と同様、`statusOf()`の引数がそのまま素通しされる（`selectable-self-buff-catalog.ts`・
 * `self-buff-definitions.ts`参照）。効果量が現在体力に依存する特性（例:「狂奔」「渦流」）のために使う
 */
export const AugmentBuffDebuff = (config: SubjectConfig, status: Status, currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({
    ...HavocBuffDebuff(config, status, currentHPRatio),
    ...ChaosBuffDebuff(config, status, currentHPRatio),
    ...FortificationBuffDebuff(config, status, currentHPRatio),
    ...SupportBuffDebuff(config, status, currentHPRatio)
});

/**
 * 特性が他者（味方・敵。`SubjectConfig.incomingBuffs`のdocコメント参照）に与えるバフ・デバフの定義
 * （`origin: "augment"`）。`WeaponSkillModule.givenBuffDebuff`・`TacticalSkillGivenBuffDebuff`と同様、
 * 受信側の計算機は発生源のconfigを保持していないため定数カタログとして定義する。特性はサブディレクトリを
 * 持たない単一モジュールで`weapon-skills/dictionary.ts`のようなglob集約は不要なため、
 * `ingame-params/buff-debuff/incoming-catalog.ts`から直接importする（`source.ts`の発生源表示解決にも
 * 直接参照される）。`AugmentBuffDebuff`と同様、カテゴリごとの実体は`<category>-buff-debuff.ts`にあり、
 * このファイルは集約するだけ
 */
export const AugmentGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    ...HavocGivenBuffDebuff,
    ...ChaosGivenBuffDebuff,
    ...FortificationGivenBuffDebuff,
    ...SupportGivenBuffDebuff
};
