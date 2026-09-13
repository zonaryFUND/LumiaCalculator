import { EquipmentStatusDictionary } from "core/equipment";
import { SubjectConfig } from "./type";
import { Equipment } from "./equipment";
import { SkillLevels } from "./skill-levels";
import { subjectSkillListOf } from "../subject-dictionary-registry";
import type { SkillCodes } from "@app/ingame-params/subjects/type";

/**
 * 現在のコード上の静的辞書と照合し、もはや存在しない参照（バランス調整パッチで削除された装備アイテムIDなど）
 * を安全な既定値に戻す
 *
 * localStorageに保存された古いビルド・プリセットは、保存後にゲーム内要素が削除・変更されても古いIDを
 * 保持したままになる。装備アイテムIDは`EquipmentStatusDictionary`をはじめ計算エンジン・UI各所で
 * `EquipmentStatusDictionary[itemID].xxx`のように無条件アクセスされており、存在しないIDのままだと
 * TypeErrorでクラッシュする（docs/known-issues.md「localStorage復元時、存在しなくなった装備アイテムID
 * によるクラッシュ」参照）
 *
 * `config.selfBuffs`/`incomingBuffs`のid解決は、計算（`calculation.ts`）・UI（`self-buffs.tsx`/
 * `incoming-buffs.tsx`）のいずれも`definitions[id]`が`undefined`のときを既に安全に無視する実装になっている
 * （存在しなくなったidは単に効果を及ぼさず一覧にも表示されなくなるだけでクラッシュしない）ため、
 * ここでのサニタイズ対象には含めない
 *
 * `features/subject-config/store.tsx`の`_updateConfig`（実質すべての`set*`系アクションが通る集約点）と
 * `persist`の`merge`（起動時のlocalStorage復元）の2箇所から呼ぶことで、それ以外の個々の参照箇所
 * （10箇所以上）を一切変更せずに安全性を担保する
 *
 * スキルレベル（`config.skillLevels`）についても同様に、パッチによる最大レベル変更（「QWERTそれぞれの
 * 最大スキルレベル」の仕様変更は前例がある）後、旧仕様の値のまま保存されているケースを、現在の実験体固有
 * スキル一覧定義（`SubjectSkillListExpressionDictionary`、`subjects/dictionary.ts`）から算出される最大値に
 * クランプすることで解消する（2026-09、`subject-dictionary-registry.ts`の追加により、循環参照を踏まずに
 * この辞書を安全に参照できるようになったため対応）。装備アイテムIDと異なり「存在しない値」でのクラッシュは
 * 起きない（`calculateValue`の`skillLevel`配列アクセスは`extractSkillLevel`が返す値をそのまま添字に使うため、
 * 配列の範囲外を指すと`undefined`値がそのまま計算に混入し、クラッシュではなく誤った表示になる形で問題が
 * 顕在化する）が、意図しない誤表示を防ぐためにここで防止する
 */
export function sanitizeConfig(config: SubjectConfig): SubjectConfig {
    const equipment = sanitizeEquipment(config.equipment);
    const withSanitizedEquipment = { ...config, equipment };

    return {
        ...withSanitizedEquipment,
        skillLevels: sanitizeSkillLevels(withSanitizedEquipment)
    };
}

function sanitizeEquipment(equipment: Equipment): Equipment {
    const { isChestDavid, ...slots } = equipment;

    const sanitizedSlots = Object.fromEntries(
        Object.entries(slots).map(([slot, itemID]) => [
            slot,
            itemID != null && EquipmentStatusDictionary[itemID] != undefined ? itemID : null
        ])
    ) as Omit<Equipment, "isChestDavid">;

    return { ...sanitizedSlots, isChestDavid };
}

const DefaultMaxLevel: Record<keyof SkillLevels, number> = { Q: 5, W: 5, E: 5, R: 3, T: 3 };

/**
 * `SkillCodes`から、そのスキルの最大レベル（インゲーム表示値。`config.skillLevels`は0始まりなので
 * 有効範囲は`[0, maxLevel - 1]`）を決定する。`configurators-line.tsx`が持つ判定ロジックと同じ規則
 * （`maxLevel`未指定なら既定値、`"none"`ならレベル選択欄自体が存在しない＝検証不要）に揃えている
 */
function resolvedMaxLevel(codes: SkillCodes | undefined, skill: keyof SkillLevels): number | "none" {
    if (codes != undefined && typeof codes == "object" && !Array.isArray(codes) && codes.maxLevel != undefined) {
        return codes.maxLevel;
    }
    return DefaultMaxLevel[skill];
}

function sanitizeSkillLevels(config: SubjectConfig): SkillLevels {
    const hook = subjectSkillListOf(config.subject);
    if (!hook) return config.skillLevels;

    const list = hook(config);
    const skills: (keyof SkillLevels)[] = ["Q", "W", "E", "R", "T"];

    return skills.reduce((prev, skill) => {
        const maxLevel = resolvedMaxLevel(list[skill], skill);
        // "none"（レベル選択欄自体が存在しない）の場合、値は計算・表示のどちらにも使われないため検証不要
        if (maxLevel == "none") return prev;

        return { ...prev, [skill]: Math.min(Math.max(prev[skill], 0), maxLevel - 1) };
    }, config.skillLevels);
}
