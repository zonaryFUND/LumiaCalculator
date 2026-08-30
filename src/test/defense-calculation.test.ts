import { describe, expect, test } from "vitest";
import { calculateDefenseValue } from "core/subject-dynamic/status/combine-components";
import { StatusValueComponent } from "core/subject-dynamic/status/value-component/component";
import { ComponentStatusValue } from "core/subject-dynamic/status/type";

// calculateDefenseValue()は、パッチ1.22（2024/05/23）以降の防御力算出順序
// （基礎値合算 → バフ・デバフの割合をそれぞれ乗算 → バフ・デバフの固定値を最後に加算）を担う純粋関数。
// docs/status-model.md「defense（防御力）」の式・出展を、実データに依存しない自作値で検証する。

function component(overrides: Partial<StatusValueComponent> & { value: StatusValueComponent["value"] }): StatusValueComponent {
    return {
        origin: "subject-status",
        calculationType: "sum",
        ...overrides
    };
}

function componentValue(components: StatusValueComponent[]): ComponentStatusValue {
    return { digit: 0, components };
}

describe("calculateDefenseValue", () => {
    test("基礎値のみ: 実験体自身+装備の単純加算", () => {
        const result = calculateDefenseValue(componentValue([
            component({ origin: "subject-status", calculationType: "sum", value: { type: "constant", value: 100 } }),
            component({ origin: "equipment", calculationType: "sum", value: { type: "constant", value: 50 } })
        ]));

        expect(result.calculatedValue.toNumber()).toBe(150);
    });

    test("割合バフ・デバフは合算してから1回ではなく、それぞれ個別に乗算される（110% x 90% x 80% = 79.2%）", () => {
        const result = calculateDefenseValue(componentValue([
            component({ origin: "subject-status", calculationType: "sum", value: { type: "constant", value: 100 } }),
            component({ origin: "temporary-status", calculationType: "mul", value: { type: "constant", value: 10 } }),
            component({ origin: "temporary-status", calculationType: "mul", value: { type: "constant", value: -10 } }),
            component({ origin: "temporary-status", calculationType: "mul", value: { type: "constant", value: -20 } })
        ]));

        // 素の防御力100に対して79.2%: 79.2
        expect(result.calculatedValue.toNumber()).toBe(79);  // digit=0のためfloor
        expect(result.multiplier.toNumber()).toBeCloseTo(-20.8, 5);
    });

    test("バフ・デバフの固定値増減は、割合乗算の後に加算される（素の合算には含まれない）", () => {
        const result = calculateDefenseValue(componentValue([
            component({ origin: "subject-status", calculationType: "sum", value: { type: "constant", value: 100 } }),
            component({ origin: "equipment", calculationType: "sum", value: { type: "constant", value: 50 } }),
            component({ origin: "temporary-status", calculationType: "mul", value: { type: "constant", value: -20 } }),
            component({ origin: "temporary-status", calculationType: "sum", value: { type: "constant", value: 30 } })
        ]));

        // (100+50) * 80% + 30 = 120 + 30 = 150
        expect(result.calculatedValue.toNumber()).toBe(150);
    });

    test("固定値バフ・デバフを先に単純加算してしまう(誤った順序)場合と異なる結果になることの確認", () => {
        // 誤った順序: (100+50+30) * 80% = 144
        // 正しい順序（本実装）: (100+50) * 80% + 30 = 150
        const result = calculateDefenseValue(componentValue([
            component({ origin: "subject-status", calculationType: "sum", value: { type: "constant", value: 100 } }),
            component({ origin: "equipment", calculationType: "sum", value: { type: "constant", value: 50 } }),
            component({ origin: "temporary-status", calculationType: "mul", value: { type: "constant", value: -20 } }),
            component({ origin: "temporary-status", calculationType: "sum", value: { type: "constant", value: 30 } })
        ]));

        expect(result.calculatedValue.toNumber()).not.toBe(144);
        expect(result.calculatedValue.toNumber()).toBe(150);
    });

    test("additionalValueは実験体自身の基礎値のみを差し引いた値のまま（装備・バフ由来の上昇分）", () => {
        const result = calculateDefenseValue(componentValue([
            component({ origin: "subject-status", calculationType: "sum", value: { type: "constant", value: 100 } }),
            component({ origin: "equipment", calculationType: "sum", value: { type: "constant", value: 50 } }),
            component({ origin: "temporary-status", calculationType: "sum", value: { type: "constant", value: 30 } })
        ]));

        // (100+50) + 30 - 100(実験体自身のみ) = 80
        expect(result.additionalValue.toNumber()).toBe(80);
    });
});
