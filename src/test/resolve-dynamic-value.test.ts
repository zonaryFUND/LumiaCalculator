import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { resolveDynamicValue } from "core/value-ratio";

// resolveDynamicValueは、calculateValue()が実際の数値へ解決せずに返す動的レシオ（対象HPや自身の
// 失ったHPに依存する部分）を、対戦モードの実際のHP状態から最終的な数値へ解決する純粋関数。
// 以前はcombat/subtables/rows/use-dynamic-value-calculation.tsxという「use」接頭辞のファイルに
// 存在したが、内部でReactの機能を一切使っていなかった（core/README.md項目8参照）。

const sender = { hp: new Decimal(800), maxHP: new Decimal(1000) };
const receptor = { hp: new Decimal(300), maxHP: new Decimal(500) };

describe("resolveDynamicValue", () => {
    test("basePotencyが未定義なら効果量0を返す", () => {
        const result = resolveDynamicValue(undefined, undefined, sender, receptor);
        expect(result.potency.toNumber()).toBe(0);
        expect(result.potencyDictionary).toBeUndefined();
    });

    test("targetHPは対象の現在HPを参照する", () => {
        const result = resolveDynamicValue({ targetHP: new Decimal(10) }, undefined, sender, receptor);
        // 対象の現在HP(300)の10%
        expect(result.potency.toNumber()).toBe(30);
    });

    test("targetMaxHPは対象の最大HPを参照する", () => {
        const result = resolveDynamicValue({ targetMaxHP: new Decimal(10) }, undefined, sender, receptor);
        // 対象の最大HP(500)の10%
        expect(result.potency.toNumber()).toBe(50);
    });

    test("targetLostHPは対象が失ったHP(最大HP-現在HP)を参照する", () => {
        const result = resolveDynamicValue({ targetLostHP: new Decimal(10) }, undefined, sender, receptor);
        // 対象が失ったHP(500-300=200)の10%
        expect(result.potency.toNumber()).toBe(20);
    });

    test("lostHPは自身が失ったHP(最大HP-現在HP)を参照する", () => {
        const result = resolveDynamicValue({ lostHP: new Decimal(10) }, undefined, sender, receptor);
        // 自身が失ったHP(1000-800=200)の10%
        expect(result.potency.toNumber()).toBe(20);
    });

    test("複数キーが指定された場合は合算される", () => {
        const result = resolveDynamicValue(
            { targetHP: new Decimal(10), lostHP: new Decimal(5) },
            undefined,
            sender,
            receptor
        );
        // 対象の現在HP(300)の10% = 30、自身が失ったHP(200)の5% = 10 → 合計40
        expect(result.potency.toNumber()).toBe(40);
        expect(result.potencyDictionary?.targetHP?.calculated.toNumber()).toBe(30);
        expect(result.potencyDictionary?.lostHP?.calculated.toNumber()).toBe(10);
    });

    test("multiplierが指定された場合はさらに乗算される", () => {
        const result = resolveDynamicValue({ targetHP: new Decimal(10) }, 50, sender, receptor);
        // 対象の現在HP(300)の10% = 30、さらに50%を乗算 = 15
        expect(result.potency.toNumber()).toBe(15);
    });

    test("未知のキーが渡されると例外を投げる", () => {
        expect(() => resolveDynamicValue(
            { base: new Decimal(10) } as never,
            undefined,
            sender,
            receptor
        )).toThrow();
    });
});
