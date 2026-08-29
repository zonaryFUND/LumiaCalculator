import { describe, expect, test } from "vitest";
import Decimal from "decimal.js";
import { createMitigation, mitigatedDamage } from "core/damage-table/mitigation";
import { statusValue, stubStatus } from "./helpers/status-stub";

// createMitigation/mitigatedDamageは「防御力・防御貫通・被ダメージ減少ステータスから、
// 最終ダメージがどう軽減されるか」という、ゲームバランスパッチでは変化しないアルゴリズムを担う純粋関数。
// docs/damage-model.md「ダメージ軽減・防御計算」節の数式を、実データに依存しない自作値で検証する。

describe("createMitigation", () => {
    test("防御力のみによる軽減率: 100/(100+防御力)*100", () => {
        const mitigation = createMitigation(
            stubStatus(),
            stubStatus({ defense: statusValue(100) })
        );

        expect(mitigation.defenseMitigation.basic.toNumber()).toBe(50);
    });

    test("防御貫通の適用順序: 割合成分は貫通適用前の素の防御力に対して計算される", () => {
        // 素の防御力200、固定貫通50、割合貫通25%
        // 割合分は素の防御力(200)の25% = 50 (貫通適用後の防御力に対してではない)
        // 合計貫通 = 50(固定) + 50(割合) = 100 → 軽減後防御力 = 100
        const mitigation = createMitigation(
            stubStatus({
                penetrationDefense: statusValue(50),
                penetrationDefenseRatio: statusValue(25)
            }),
            stubStatus({ defense: statusValue(200) })
        );

        expect(mitigation.defense.penetration.toNumber()).toBe(100);
        expect(mitigation.defenseMitigation.basic.toNumber()).toBe(50);
    });
});

describe("mitigatedDamage", () => {
    test("基本攻撃属性: 防御軽減のあと、基本攻撃被ダメージ減少率(%)がさらに乗算で適用される", () => {
        const mitigation = createMitigation(
            stubStatus(),
            stubStatus({
                defense: statusValue(100), // 防御軽減率50%
                preventBasicAttackDamagedRatio: statusValue(10)
            })
        );

        const [result] = mitigatedDamage(new Decimal(1000), mitigation, "basic", false);

        // 1000 -(防御50%)-> 500 -(基本攻撃被ダメージ減少10%)-> 450
        expect(result.toNumber()).toBe(450);
    });

    test("スキル属性: 基本攻撃とは異なる軽減率テーブル(skillMitigation)が使われる", () => {
        const mitigation = createMitigation(
            stubStatus(),
            stubStatus({
                defense: statusValue(100), // 防御軽減率50%
                preventBasicAttackDamagedRatio: statusValue(90), // skill側では無視されるべき値
                preventSkillDamagedRatio: statusValue(20)
            })
        );

        const [result] = mitigatedDamage(new Decimal(1000), mitigation, "skill", false);

        // 1000 -(防御50%)-> 500 -(スキル被ダメージ減少20%)-> 400
        expect(result.toNumber()).toBe(400);
    });

    test("固定値軽減(ガーネットT想定)はヒット数ぶん乗算されたうえで、割合軽減より後に減算される", () => {
        const mitigation = createMitigation(
            stubStatus(),
            stubStatus({
                defense: statusValue(100), // 防御軽減率50%
                preventBasicAttackDamaged: statusValue(30)
            })
        );

        const [result, info] = mitigatedDamage(new Decimal(1000), mitigation, "basic", false, 3);

        // 1000 -(防御50%)-> 500 -(固定値30 x 3ヒット = 90を減算)-> 410
        expect(result.toNumber()).toBe(410);
        const constantInfo = info.find(i => i.subtractionCount != undefined);
        expect(constantInfo?.subtractionCount).toBe(3);
        expect(constantInfo?.mitigated.toNumber()).toBe(410);
    });
});
