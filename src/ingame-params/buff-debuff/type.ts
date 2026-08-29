import { ComponentStatus } from "core/subject-dynamic/status/type";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";

/**
 * バフ・デバフの発生源
 *
 * - `skill`: 実験体固有のスキル（`ingame-params/subjects/{name}/buff-debuff.ts`）
 * - `equipment-ability`: 装備固有のアビリティ（`ingame-params/equipment-abilities/{name}/buff-debuff.ts`）
 * - `augment`: 特性（`ingame-params/perpetual-outer-buffs/`）
 *
 * 自己バフの削除可否（`SubjectConfig.selfBuffs`から追加・削除できるかどうか）は`origin === "augment"`から
 * 導出する。`skill`/`equipment-ability`由来の自己バフは、実験体・装備の選択に応じて自動的に投入・削除される
 * だけで、ユーザーが直接追加・削除することはない。
 */
export type BuffDebuffOrigin = "skill" | "equipment-ability" | "augment"

/**
 * 自己バフ（`SubjectConfig.selfBuffs`）1件の定義
 *
 * @property maxStack `BuffDebuffState.stack`が取りうる最大値。スタックは常に0以上の連続した整数値を取る
 * （`0..maxStack`）。「1スタックのみ可能なバフ」は`maxStack: 1`、「切り替え式バフ」も内部的には
 * `0..maxStack`の連続した固有IDとして表現し、UI上の表示名はIntlメッセージキーの命名規則側で解決する。
 * @property buff 選択されたスタック値から、そのスタックにおけるステータス変換量を算出する
 */
export type SelfBuffDefinition = {
    origin: BuffDebuffOrigin
    nameIntlID: string
    maxStack: number
    buff: (stack: number) => Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent[]>>
}
