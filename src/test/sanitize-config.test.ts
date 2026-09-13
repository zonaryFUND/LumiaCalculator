import { describe, expect, test } from "vitest";
import { sanitizeConfig, SubjectConfigDefault } from "core/subject-dynamic/config";
import { EquipmentStatusDictionary } from "core/equipment";
import { registerSubjectSkillLists } from "core/subject-dynamic/subject-dictionary-registry";
import { SubjectSkillListExpressionDictionary } from "@app/ingame-params/subjects/dictionary";

// sanitizeConfigは、パッチ対応でゲーム内要素が削除・変更された場合に、localStorageへ保存された古いビルド・
// プリセットが存在しない装備アイテムIDを参照したままクラッシュするのを防ぐための純粋関数
// （core/subject-dynamic/config/sanitize.ts参照）。selfBuffs/incomingBuffsのid解決は計算・UIの両方が
// 既に安全に無視する実装になっているため対象外。

const InvalidItemID = 999999999; // EquipmentStatusDictionaryに存在しないことが保証されるID
const ValidItemID = Number(Object.keys(EquipmentStatusDictionary)[0]);

describe("sanitizeConfig", () => {
    test("存在しない装備IDはnullに戻す", () => {
        const config = {
            ...SubjectConfigDefault,
            equipment: { ...SubjectConfigDefault.equipment, Weapon: InvalidItemID }
        };
        expect(sanitizeConfig(config).equipment.Weapon).toBeNull();
    });

    test("存在する装備IDはそのまま保持する", () => {
        const config = {
            ...SubjectConfigDefault,
            equipment: { ...SubjectConfigDefault.equipment, Weapon: ValidItemID }
        };
        expect(sanitizeConfig(config).equipment.Weapon).toBe(ValidItemID);
    });

    test("未装備（null）のスロットはそのままnull", () => {
        expect(sanitizeConfig(SubjectConfigDefault).equipment).toEqual(SubjectConfigDefault.equipment);
    });

    test("複数スロットが同時に無効な場合、それぞれ独立にnullへ戻す", () => {
        const config = {
            ...SubjectConfigDefault,
            equipment: {
                ...SubjectConfigDefault.equipment,
                Weapon: InvalidItemID,
                Chest: ValidItemID,
                Head: InvalidItemID
            }
        };
        const result = sanitizeConfig(config).equipment;
        expect(result.Weapon).toBeNull();
        expect(result.Chest).toBe(ValidItemID);
        expect(result.Head).toBeNull();
    });

    test("isChestDavidなど装備以外のフィールドは変更しない", () => {
        const config = { ...SubjectConfigDefault, level: 15, equipment: { ...SubjectConfigDefault.equipment, isChestDavid: true } };
        const result = sanitizeConfig(config);
        expect(result.level).toBe(15);
        expect(result.equipment.isChestDavid).toBe(true);
    });
});

// スキルレベルの妥当性チェック（パッチによる最大レベル変更後、旧仕様の値のまま保存されているケースへの対応。
// docs/known-issues.mdの「未対応（将来の課題）」として記録されていたものを、subject-dictionary-registry.ts
// 経由で循環参照を踏まずに`SubjectSkillListExpressionDictionary`へ安全にアクセスできるようになったことを
// 受けて実装した）。架空の実験体コードで`registerSubjectSkillLists`に直接fixtureを登録することで、実データに
// 依存しないパッチ耐性の高いテストにしている（実データの辞書もあわせて保持し、他のテストに影響しないようにする）
const TestSubjectCode = 999999;

describe("sanitizeConfig - skillLevels", () => {
    test("最大レベルを超えるスキルレベルはクランプする（maxLevel指定・既定値・\"none\"・負値の全パターン）", () => {
        registerSubjectSkillLists({
            ...SubjectSkillListExpressionDictionary,
            [TestSubjectCode]: () => ({
                Q: { code: 1, maxLevel: 3 }, // 明示的なmaxLevel指定
                W: 1, // maxLevel未指定（プレーンな数値）→既定値5
                E: 1,
                R: { code: 1, maxLevel: "none" as const }, // レベル選択欄自体が存在しない→検証しない
                T: 1
            })
        });

        const config = {
            ...SubjectConfigDefault,
            subject: TestSubjectCode,
            skillLevels: { Q: 10, W: 10, E: 2, R: 99, T: -1 }
        };

        const result = sanitizeConfig(config).skillLevels;
        expect(result).toEqual({
            Q: 2,   // maxLevel 3 → 0始まりの上限は2
            W: 4,   // 既定値5 → 上限4
            E: 2,   // 元々範囲内なので変化なし
            R: 99,  // "none"は検証対象外なのでそのまま
            T: 0    // 負値は0にクランプ
        });

        // 実データの辞書を壊していないことも確認する（後続のテスト・他ファイルへの影響がないように）
        expect(SubjectSkillListExpressionDictionary[TestSubjectCode]).toBeUndefined();
    });

    test("実験体固有のスキルリスト定義が登録されていない場合、skillLevelsを変更しない", () => {
        const config = {
            ...SubjectConfigDefault,
            subject: 999998, // どこにも登録されていない架空のコード
            skillLevels: { Q: 999, W: 999, E: 999, R: 999, T: 999 }
        };
        expect(sanitizeConfig(config).skillLevels).toEqual(config.skillLevels);
    });

    test("実データでも実際にクランプされる（circular importを踏まずに辞書へアクセスできることの統合確認）", () => {
        const config = {
            ...SubjectConfigDefault,
            subject: 61, // イレム。Qにmaxlevel指定がある実験体
            skillLevels: { Q: 999, W: 999, E: 999, R: 999, T: 999 }
        };
        const result = sanitizeConfig(config).skillLevels;

        for (const key of ["Q", "W", "E", "R", "T"] as const) {
            expect(Number.isFinite(result[key])).toBe(true);
            expect(result[key]).toBeGreaterThanOrEqual(0);
        }
        // "none"指定でない限り999のままにはならない（少なくとも1つは既定値/固有の上限でクランプされる）
        expect(Object.values(result).some(v => v < 999)).toBe(true);
    });
});
