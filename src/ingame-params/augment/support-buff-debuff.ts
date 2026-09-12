import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { SubjectConfig } from "core/subject-dynamic/config";
import { Status } from "core/subject-dynamic/status/type";

// サポート系特性は未着手（着手時、スロウを持つ特性があればここに追加する）
export const SupportSlowSources: SlowSourceInfo[] = [];

/**
 * サポート系特性（`support.ts`）由来の選択式自己バフ（`origin: "augment"`）。`buff-debuff.ts`の
 * `AugmentBuffDebuff`から集約される。
 *
 * 現時点ではまだ着手していない（破壊系・カオス系・抵抗系のパス完了後に着手予定）
 */
export const SupportBuffDebuff = (_config: SubjectConfig, _status: Status, _currentHPRatio: number): Record<string, BuffDebuffDefinition> => ({});

/**
 * サポート系特性（`support.ts`）が他者（味方・敵）に与えるバフ・デバフの定義（`origin: "augment"`）。
 * `buff-debuff.ts`の`AugmentGivenBuffDebuff`から集約される。現時点ではまだ着手していない
 */
export const SupportGivenBuffDebuff: Record<string, BuffDebuffDefinition> = {};
