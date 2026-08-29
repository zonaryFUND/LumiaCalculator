import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { healPowerOf, applyHealPower } from "core/damage-table/heal-power";
import { statusValue, stubStatus } from "./helpers/status-stub";

// healPowerOf/applyHealPowerは「回復効果には『与える回復増加』ステータスの割合を乗算する」という、
// docs/damage-model.md「計算順序まとめ」3.のルールを担う純粋関数。
// 以前はSimple/Combat双方の行コンポーネントに独立して重複実装されていた（core/README.md項目7参照）。

describe("healPowerOf", () => {
    test("回復効果でなければundefinedを返す", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        expect(healPowerOf(status, { type: "skill" })).toBeUndefined();
        expect(healPowerOf(status, undefined)).toBeUndefined();
    });

    test("回復効果でも、与える回復増加が0以下なら適用しない", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(0) });
        expect(healPowerOf(status, { type: "heal", target: "self" })).toBeUndefined();
    });

    test("回復効果かつ与える回復増加が正の場合、その割合を返す", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        const result = healPowerOf(status, { type: "heal", target: "self" });
        expect(result?.toNumber()).toBe(30);
    });

    test("シールドは回復効果と別種別のため適用しない", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        expect(healPowerOf(status, { type: "shield", target: "self" })).toBeUndefined();
    });
});

describe("applyHealPower", () => {
    test("healPowerがundefinedなら値は変化しない", () => {
        expect(applyHealPower(new Decimal(1000), undefined).toNumber()).toBe(1000);
    });

    test("healPowerが指定されていれば、その割合ぶん値に乗算される", () => {
        // 1000 x (100% + 30%) = 1300
        expect(applyHealPower(new Decimal(1000), new Decimal(30)).toNumber()).toBe(1300);
    });
});
