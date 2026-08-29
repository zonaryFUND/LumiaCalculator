import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { criticalMultiplier, expectedMultiplier } from "core/damage-table/critical";

// criticalMultiplier/expectedMultiplierは、docs/damage-model.md「致命打（クリティカル）」の
// 計算式（175% + 致命打ダメージ量、致命打確率による期待値の重み付け平均）を担う純粋関数。
//
// 以前はSimple/Combat両モードにそれぞれ独立実装があり、Simple mode側
// (potency-rows/critical-available.tsx)の期待値の式は、致命打ダメージの絶対値を経由して
// regularDamageを二重に乗算してしまうバグを持っていた（core/README.md項目8参照）。
// このテストは、その修正後の正しい期待値（確率で重み付けした加重平均）を固定する。

describe("criticalMultiplier", () => {
    test("致命打ダメージ量ステータスが0なら基礎値175%になる", () => {
        expect(criticalMultiplier(new Decimal(0)).toNumber()).toBe(175);
    });

    test("致命打ダメージ量ステータスぶん175%に加算される", () => {
        expect(criticalMultiplier(new Decimal(25)).toNumber()).toBe(200);
    });
});

describe("expectedMultiplier", () => {
    test("致命打確率0%なら通常ダメージの倍率(100%)になる", () => {
        expect(expectedMultiplier(new Decimal(0), new Decimal(175)).toNumber()).toBe(100);
    });

    test("致命打確率100%なら致命打倍率がそのまま適用される", () => {
        expect(expectedMultiplier(new Decimal(100), new Decimal(175)).toNumber()).toBe(175);
    });

    test("致命打確率50%なら通常/致命打倍率の中間になる", () => {
        // (100-50) + 175 x 50% = 50 + 87.5 = 137.5
        expect(expectedMultiplier(new Decimal(50), new Decimal(175)).toNumber()).toBe(137.5);
    });
});

describe("期待値は確率で重み付けした加重平均と一致する（回帰テスト）", () => {
    test("regularDamage=200, 致命打確率50%, 致命打ダメージ量0 の場合、期待値は275", () => {
        const regularDamage = new Decimal(200);
        const criticalChance = new Decimal(50);
        const multiplier = criticalMultiplier(new Decimal(0));

        const criticalDamage = regularDamage.percent(multiplier);
        const expectedValue = regularDamage.percent(expectedMultiplier(criticalChance, multiplier));

        expect(criticalDamage.toNumber()).toBe(350);
        // 加重平均: 200 x 50% + 350 x 50% = 100 + 175 = 275
        expect(expectedValue.toNumber()).toBe(275);
        expect(expectedValue.toNumber()).toBe(
            regularDamage.percent(100 - criticalChance.toNumber()).add(criticalDamage.percent(criticalChance)).toNumber()
        );
    });
});
