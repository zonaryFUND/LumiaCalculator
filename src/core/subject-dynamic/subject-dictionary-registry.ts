import type { SubjectCode } from "core/subject-static";
import type { SubjectConfig } from "./config";
import type { SubjectPerpetualStatus, SummonInfo } from "@app/ingame-params/subjects/type";

/**
 * `ingame-params/subjects/dictionary.ts`が持つ辞書のうち、`core/`側からも参照する必要があるものを仲介する
 * レジストリ
 *
 * `subjects/dictionary.ts`は全実験体の`index.ts`を`import.meta.glob(..., {eager: true})`で一括読み込みする。
 * `core/`側のファイルがこれを直接importすると、実験体モジュール側が（直接・間接問わず）そのcore側ファイルを
 * 再びimportしていた場合にESMの循環参照が発生し、モジュール初期化順序によっては未初期化状態の実験体モジュール
 * （`m.default`が`undefined`）を参照してクラッシュする（2026-09、`subject-skill-tooltip.test.tsx`のsmoke
 * test化で発見。`docs/known-issues.md`参照）。
 *
 * このファイルはどこにも依存しない中立な仲介役とすることで、`subjects/dictionary.ts`→ここ←`core/`側という
 * 一方向の依存関係にし、循環を構造的に断つ。`subjects/dictionary.ts`が辞書の構築を終えた直後に
 * `register*()`を呼んで登録し、`core/`側は`*Of()`関数経由でのみ参照する（`subjects/dictionary.ts`自体は
 * 一切importしない）。`SubjectConfig`・`SubjectPerpetualStatus`・`SummonInfo`は型としてのみ使うため
 * `import type`にし、実行時のimport辺（循環参照の経路になりうる辺）を作らないようにしている
 */

type WeaponRangeOverride = (config: SubjectConfig) => "melee" | "range" | undefined;

let weaponRangeOverrides: Partial<Record<SubjectCode, WeaponRangeOverride>> = {};
let perpetualStatuses: Partial<Record<SubjectCode, SubjectPerpetualStatus>> = {};
let summonInfos: Partial<Record<SubjectCode, SummonInfo[]>> = {};

export function registerSubjectWeaponRangeOverrides(dict: Partial<Record<SubjectCode, WeaponRangeOverride>>): void {
    weaponRangeOverrides = dict;
}

export function weaponRangeOverrideOf(subject: SubjectCode): WeaponRangeOverride | undefined {
    return weaponRangeOverrides[subject];
}

export function registerSubjectPerpetualStatuses(dict: Partial<Record<SubjectCode, SubjectPerpetualStatus>>): void {
    perpetualStatuses = dict;
}

export function subjectPerpetualStatusOf(subject: SubjectCode): SubjectPerpetualStatus | undefined {
    return perpetualStatuses[subject];
}

export function registerSubjectSummonInfos(dict: Partial<Record<SubjectCode, SummonInfo[]>>): void {
    summonInfos = dict;
}

export function subjectSummonInfoOf(subject: SubjectCode): SummonInfo[] | undefined {
    return summonInfos[subject];
}
