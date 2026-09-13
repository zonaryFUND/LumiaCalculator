import { SubjectConfig } from "core/subject-dynamic/config";
import { ValueOrigin } from "./calculation";
import { weaponSkillLevel } from "core/subject-dynamic/status/weapon-skill-level";
import { ValueRatio } from "./type";

/**
 * 実験体設定およびダメージ等効果発生源の設定からスキルレベルを抽出する
 *
 * 返されるスキルレベルは配列のインデックスであり、したがってゲーム内表示値-1である
 *
 * `origin == "D"`（武器スキル）の場合、本来は実験体別の熟練度→レベル対応の上書き
 * （`SubjectWeaponSkillOverrideDictionary`、`subjects/dictionary.ts`）を考慮すべきだが、あえて参照しない。
 * このファイルへの`subjects/dictionary.ts`からの直接importは、`dictionary.ts`自身が全実験体モジュールを
 * eager globしており、そこから再びこのファイルへ戻ってくる経路（多くの実験体モジュールが`calculateValue`/
 * `extractSkillLevel`を使うため）が循環参照を形成し、モジュール初期化順序によっては`m.default`が
 * 未初期化のまま参照されてクラッシュする（`subject-skill-tooltip.test.tsx`で実際に顕在化した。2026-09、
 * smoke test化の過程で発見・修正）。現在登録されている唯一の上書き（`blair`の`weaponSkillLevelOverride`）は
 * 素の`weaponSkillLevel`と同一関数のため、参照しなくても挙動は変わらない（`weapon-skills`配下の各
 * `buff-debuff.ts`が同じ理由で`extractSkillLevel`ではなく`weaponSkillLevel`を直接使っている、core/README.md項目13の
 * ワークアラウンドと同じ考え方をこちらにも適用した）。将来`blair`と異なる上書きを持つ実験体が追加された
 * 場合は不正確になる点に注意
 *
 * @param config 実験体設定構造体
 * @param origin 発生源スキル
 * @returns スキルレベル（AA/アイテムスキル/特性の場合`undefined`）
 */
export function extractSkillLevel(config: SubjectConfig, origin: ValueOrigin): number | undefined {
    if (origin == "other") return undefined;
    if (origin == "tactical1") return 0;
    if (origin == "tactical2") return 1;
    if (origin == "D") {
        return weaponSkillLevel(config.weaponMastery);
    }

    return config.skillLevels[origin];
}

/**
 * ValueRatioから「対象の最大体力」「失った体力」などの動的なレシオを除いた部分を抽出する
 * @param ratio ValueRatio構造体
 * @returns 静的な値のみを含むValueRatio構造体
 */
export function extractStaticValueRatio(ratio: ValueRatio): ValueRatio {
    const removedKeys = [
        "targetMaxHP",
        "targetHP",
        "lostHP",
        "targetLostHP"
    ];

    return Object.fromEntries(Object.entries(ratio).filter(([key]) => !removedKeys.includes(key))) as ValueRatio;
}