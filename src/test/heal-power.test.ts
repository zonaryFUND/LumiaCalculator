import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { healPowerRatiosOf, applyHealPower } from "core/damage-table/heal-power";
import { statusValue, stubStatus } from "./helpers/status-stub";

// healPowerRatiosOf/applyHealPowerは「回復・シールド効果には『与える回復増加』『与える回復・シールド効果
// 増加』ステータスの割合をそれぞれ独立に乗算する」という、docs/damage-model.md「計算順序まとめ」3.のルールを
// 担う純粋関数。以前はSimple/Combat双方の行コンポーネントに独立して重複実装されていた（core/README.md項目7
// 参照）。「与える回復増加」（healerGiveHpHealRatio、回復のみ対象）と「与える回復・シールド効果増加」
// （healerGiveHealShieldRatio、回復・シールド両方対象）は実機検証の結果、合算せずそれぞれ独立に乗算される
// ことを確認済み。

describe("healPowerRatiosOf", () => {
    test("回復効果でもシールド効果でもなければ空配列を返す", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        expect(healPowerRatiosOf(status, { type: "skill" })).toEqual([]);
        expect(healPowerRatiosOf(status, undefined)).toEqual([]);
    });

    test("回復効果でも、増加割合が0以下なら適用しない", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(0), healerGiveHealShieldRatio: statusValue(0) });
        expect(healPowerRatiosOf(status, { type: "heal", target: "self" })).toEqual([]);
    });

    test("回復効果かつ与える回復増加が正の場合、その割合を返す", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        const result = healPowerRatiosOf(status, { type: "heal", target: "self" });
        expect(result.map(v => v.toNumber())).toEqual([30]);
    });

    test("シールドには「与える回復増加」は適用しない（回復専用のため）", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30) });
        expect(healPowerRatiosOf(status, { type: "shield", target: "self" })).toEqual([]);
    });

    test("シールドには「与える回復・シールド効果増加」を適用する", () => {
        const status = stubStatus({ healerGiveHealShieldRatio: statusValue(20) });
        const result = healPowerRatiosOf(status, { type: "shield", target: "self" });
        expect(result.map(v => v.toNumber())).toEqual([20]);
    });

    test("回復効果には両方の割合が同時に適用されうる（合算した数値ではなく、それぞれ独立した要素として返す）", () => {
        const status = stubStatus({ healerGiveHpHealRatio: statusValue(30), healerGiveHealShieldRatio: statusValue(20) });
        const result = healPowerRatiosOf(status, { type: "heal", target: "self" });
        expect(result.map(v => v.toNumber())).toEqual([30, 20]);
    });

    test("自己回復（target: self）には受け手側の割合（hpHealedIncreaseRatio/hpHealedDecreaseRatio）も適用する（アイザックTのような対象不要の自己回復の例）", () => {
        const status = stubStatus({ hpHealedIncreaseRatio: statusValue(25) });
        const result = healPowerRatiosOf(status, { type: "heal", target: "self" });
        expect(result.map(v => v.toNumber())).toEqual([25]);
    });

    test("hpHealedDecreaseRatio（受ける治癒効果減少）は負の割合として返す", () => {
        const status = stubStatus({ hpHealedDecreaseRatio: statusValue(10) });
        const result = healPowerRatiosOf(status, { type: "heal", target: "self" });
        expect(result.map(v => v.toNumber())).toEqual([-10]);
    });

    test("target: any/allyには受け手側の割合を適用しない（受け手が発生源自身とは限らないため）", () => {
        const status = stubStatus({ hpHealedIncreaseRatio: statusValue(25), hpHealedDecreaseRatio: statusValue(10) });
        expect(healPowerRatiosOf(status, { type: "heal", target: "any" })).toEqual([]);
        expect(healPowerRatiosOf(status, { type: "heal", target: "ally" })).toEqual([]);
    });

    test("シールドには受け手側の割合（回復専用のため）を適用しない", () => {
        const status = stubStatus({ hpHealedIncreaseRatio: statusValue(25) });
        expect(healPowerRatiosOf(status, { type: "shield", target: "self" })).toEqual([]);
    });
});

describe("applyHealPower", () => {
    test("healPowerRatiosが空配列なら値は変化しない", () => {
        expect(applyHealPower(new Decimal(1000), []).toNumber()).toBe(1000);
    });

    test("healPowerRatiosが1件なら、その割合ぶん値に乗算される", () => {
        // 1000 x (100% + 30%) = 1300
        expect(applyHealPower(new Decimal(1000), [new Decimal(30)]).toNumber()).toBe(1300);
    });

    test("healPowerRatiosが複数件なら、合算せずそれぞれ独立に順次乗算される", () => {
        // 1000 x (100% + 30%) x (100% + 20%) = 1560 （1000 x 150% = 1500 ではない）
        expect(applyHealPower(new Decimal(1000), [new Decimal(30), new Decimal(20)]).toNumber()).toBe(1560);
    });
});
