import { describe, expect, test, vi } from "vitest";
import { SubjectConfigDefault } from "core/subject-dynamic/config";
import { basicAttackRatioOf } from "core/subject-dynamic/status/basic-attack-ratio";

// basicAttackRatioOfは、武器種ごとに基本攻撃の威力倍率・弾数を決める純粋関数
// （突撃小銃・双剣の特殊ケース以外は攻撃力の100%、というルール）。
// 実装はEquipmentStatusDictionary（実データ）からIDの武器種を引くが、テストではこのアルゴリズム自体
// （武器種ごとの分岐）だけを検証したいので、docs/testing-guidelines.md「①ロジック層」の方針に沿って
// EquipmentStatusDictionaryを自作の対応表でモックし、実際の装備IDや実データには依存しない
// （vi.mockはvitestによりファイル先頭へ巻き上げられるため、このimportより後ろに書いても適用される）。
vi.mock("core/equipment", () => ({
    EquipmentStatusDictionary: {
        1: { type: "AssaultRifle" },
        2: { type: "DualSword" },
        3: { type: "OneHandSword" }
    }
}));

function configWithWeapon(weapon: number | null) {
    return { ...SubjectConfigDefault, equipment: { ...SubjectConfigDefault.equipment, Weapon: weapon } };
}

describe("basicAttackRatioOf", () => {
    test("武器未装備の場合は空オブジェクトを返す", () => {
        expect(basicAttackRatioOf(configWithWeapon(null))).toEqual({});
    });

    test("突撃小銃は3ヒット分の合計倍率・弾数3を返す", () => {
        const result = basicAttackRatioOf(configWithWeapon(1));
        expect(result.hitCount).toBe(3);
        expect(result.labelIntlID).toBe("app.basic-attack.assault-rifle");
        expect(result.attackRatio).toBeGreaterThan(0);
    });

    test("双剣は2ヒット分の合計倍率・弾数2を返す", () => {
        const result = basicAttackRatioOf(configWithWeapon(2));
        expect(result.hitCount).toBe(2);
        expect(result.labelIntlID).toBe("app.basic-attack.dual-sword");
        expect(result.attackRatio).toBeGreaterThan(0);
    });

    test("それ以外の武器種は攻撃力の100%、弾数の指定なし", () => {
        const result = basicAttackRatioOf(configWithWeapon(3));
        expect(result).toEqual({
            attackRatio: 100,
            labelIntlID: "app.basic-attack"
        });
    });
});
