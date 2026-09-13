import { describe, expect, test } from "vitest";
import { sanitizeConfig, SubjectConfigDefault } from "core/subject-dynamic/config";
import { EquipmentStatusDictionary } from "core/equipment";

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
