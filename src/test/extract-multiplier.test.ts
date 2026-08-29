import { describe, expect, test } from "vitest";
import { extractMultiplier } from "@app/features/damage/damage-table-util";

// extractMultiplierは「倍率指定の複数の書き方（固定値・スキルレベル依存配列・ラベル付き複数要素）を
// どう1つの合成倍率にまとめるか」という、ゲームバランスパッチでは変化しないアルゴリズムを担う純粋関数。
// テスト用の数値は実在するスキルの値と無関係な自作値でよく、実データ(nimbleapi jsonなど)には一切依存しない。
// そのため、この種のロジックはパッチの頻度に関わらず安定してテストし続けられる。

describe("extractMultiplier", () => {
    test("倍率が指定されない場合はundefinedを返す", () => {
        expect(extractMultiplier(undefined)).toBeUndefined();
    });

    test("単一のnumberは固定倍率として扱われる", () => {
        expect(extractMultiplier(150)).toEqual({
            mergedMultiplier: 150,
            individualExpressions: [{ value: 150 }]
        });
    });

    test("スキルレベル依存配列は、指定されたレベルの値を採用する", () => {
        const result = extractMultiplier([100, 120, 140, 160, 180], 2);
        expect(result?.mergedMultiplier).toBe(140);
        expect(result?.individualExpressions).toEqual([{ value: 140 }]);
    });

    test("スキルレベル依存の倍率をレベル指定なしで解決しようとするとエラーになる", () => {
        expect(() => extractMultiplier([100, 120, 140])).toThrow();
    });

    test("ラベル付きの複数要素は、100%を起点に乗算で合成される", () => {
        // 50% x 50% = 25%(100%起点からの相対値)
        const result = extractMultiplier([
            { label: "hit1", value: 50 },
            { label: "hit2", value: 50 }
        ]);

        expect(result?.mergedMultiplier).toBe(25);
        expect(result?.individualExpressions).toEqual([
            { label: "hit1", value: 50 },
            { label: "hit2", value: 50 }
        ]);
    });

    test("ラベル付き要素のうち、値がスキルレベル依存配列であるものはレベルに応じて解決される", () => {
        const result = extractMultiplier(
            [{ label: "hit", value: [50, 60, 70] }],
            1
        );

        expect(result?.mergedMultiplier).toBe(60);
        expect(result?.individualExpressions).toEqual([{ label: "hit", value: 60 }]);
    });
});
