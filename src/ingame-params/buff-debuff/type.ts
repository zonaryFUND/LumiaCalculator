import { ComponentStatus } from "core/subject-dynamic/status/type";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";

/**
 * バフ・デバフの発生源
 *
 * - `skill`: 実験体固有のスキル（`ingame-params/subjects/{name}/buff-debuff.ts`）
 * - `equipment-ability`: 装備固有のアビリティ（`ingame-params/equipment-abilities/{name}/buff-debuff.ts`）
 * - `augment`: 特性（`ingame-params/augment/buff-debuff.ts`）
 * - `tactical-skill`: 戦術スキル（`ingame-params/tactical-skill/buff-debuff.ts`）
 * - `misc`: 上記のいずれにも当てはまらない、その他の恒久バフ（オブジェクト討伐・アイテム使用時の恒久効果等。
 *   例: アルファ処置・聖水）（`ingame-params/perpetual-outer-buffs/`）。`skill`/`equipment-ability`由来と
 *   異なり、装備アビリティのような「発生源アイテム名」を持たない・持つ必要がないカテゴリなしの寄せ集めのため、
 *   UI上も発生源表記を一切行わない（`nameIntlID`単体で何のバフか判別できるものだけをここに置く）
 * - `generic`: 発生源を問わず1つの汎用エントリに束ねるバフ・デバフ（`ingame-params/buff-debuff/
 *   generic-slow.ts`）。`misc`と異なり「個々の効果は発生源ごとに実在するが、発生源の数が多すぎて
 *   個別列挙する意味が薄い」もの（例: 移動速度減少）を指す。実際にどの発生源がどの効果量を持つかは、
 *   計算には一切関与しない参照専用の「辞書」（`SlowSourceInfo`・`slow-dictionary.ts`）側で別途保持する
 *
 * 自己バフの削除可否（`SubjectConfig.selfBuffs`から追加・削除できるかどうか）は`origin`が`skill`/
 * `equipment-ability`かどうかから導出する（`self-buff-definitions.ts`の`autoSelfBuffDefinitionsOf`参照）。
 * これら2つは実験体・装備の選択に応じて自動的に投入・削除されるだけでユーザーが直接追加・削除することはない
 * のに対し、`augment`/`tactical-skill`/`misc`はユーザーが`incomingBuffs`と同様に自らカタログ
 * （`selectable-self-buff-catalog.ts`）から選んで追加・削除する「選択式自己バフ」であり、実験体・装備の
 * 選択が変わっても自動的には投入・削除されない（`reconcileSelfBuffs`参照）。`generic`は自己バフとしては
 * 使わず、常に他者からの`incomingBuffs`側でのみ使う想定
 */
export type BuffDebuffOrigin = "skill" | "equipment-ability" | "augment" | "tactical-skill" | "misc" | "generic"

/**
 * バフ・デバフ（`SubjectConfig.selfBuffs`/`incomingBuffs`）1件の定義
 *
 * 自己バフ・他者バフの両カタログで共有する形状。自己バフ側は`SubjectSelfBuffDebuff`
 * （`SubjectConfig`を引数に取る関数）が算出したものを使うのに対し、他者バフ側
 * （`SubjectModules.givenBuffDebuff`）は発生源実験体のconfigを受信側の計算機が保持していないため、
 * この型自体はconfigに依存しない定数として定義される。
 *
 * @property maxStack `BuffDebuffState.stack`が取りうる最大値。スタックは常に0以上の連続した整数値を取る
 * （`0..maxStack`）。「1スタックのみ可能なバフ」は`maxStack: 1`、「切り替え式バフ」も内部的には
 * `0..maxStack`の連続した固有IDとして表現し、UI上の表示名はIntlメッセージキーの命名規則側で解決する。
 * @property stackLabels プルダウンの各選択肢（0..maxStack、`maxStack + 1`個）に表示するIntlメッセージIDの
 * 配列。省略時はスタック数をそのまま数字で表示する（ラベルのない数字はスタック数だと自明なため）。
 * 切り替え式バフ（例: イレムの「形態」）や、本来スタックしない効果の効果量が発生源スキルレベル等
 * 別の軸で変化する場合（例: 敵のスキルレベルをそのままstackとして代用するデバフ）に指定する
 * @property buff 選択されたスタック値から、そのスタックにおけるステータス変換量を算出する
 * @property excludeNoneOption 切り替え式バフ（`stackLabels`指定）のうち、実験体が常にいずれかの状態にあり
 * 「どちらでもない」状態が存在しないもの（例: ブレアの双剣/両剣モード）向け。trueの場合、スタック0
 * （`stackLabels[0]`、通常「なし」）をプルダウンの選択肢から除外する。`reconcileSelfBuffs`が新規投入する
 * 際の初期スタックも0ではなく1になる（`self-buff-definitions.ts`参照）
 *
 * このRecordのキー（id）は、装備アビリティ由来の場合、そのアビリティ内でのみ一意であればよい
 * 「ローカルid」（例: `"move-speed"`）として扱われる。グローバルな一意性・発生源アイテムの特定は、
 * アイテムを列挙する呼び出し側（`equipment-abilities/dictionary.ts`・`self-buff-definitions.ts`）が
 * `${itemID}:${localId}`の形で名前空間を付与することで担保する。定義自体はどのアイテムから
 * 呼ばれたか一切知らない（`EquipmentAbilityImportedProps`参照）
 */
export type BuffDebuffDefinition = {
    origin: BuffDebuffOrigin
    nameIntlID: string
    maxStack: number
    stackLabels?: string[]
    excludeNoneOption?: boolean
    buff: (stack: number) => Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent[]>>
}

/**
 * 移動速度減少（スロウ）を持つ実験体固有スキル・武器スキル・装備アビリティ・戦術スキルが、「その発生源が
 * 何%のスロウを持つか」を宣言するための、参照専用（`slow-dictionary.ts`が集約し辞書UIで表示するだけ）の
 * データ。計算（`statusOf()`・`GenericSlowDebuff`）には一切関与しない。実際のスロウ効果自体は
 * `origin: "generic"`の単一エントリ（`generic-slow.ts`）で表現するため、ここで宣言してもその実験体・武器・
 * 装備・戦術スキル自身の`givenBuffDebuff`にスロウを個別登録する必要はない（する場合、汎用エントリと二重に
 * 計算されてしまうため、むしろしてはいけない）
 *
 * @property nameIntlID このスキル・アビリティの表示名（例: 実験体スキルなら"Q"のようなキー表記）
 * @property values %。スキルレベル等の軸で変化する場合は複数要素の配列（1つしかない場合も要素数1の配列）
 * @property valueLabels `values`と対応するラベル（省略時はインデックスをそのまま数値表示）
 */
export type SlowSourceInfo = {
    nameIntlID: string
    values: number[]
    valueLabels?: string[]
}
