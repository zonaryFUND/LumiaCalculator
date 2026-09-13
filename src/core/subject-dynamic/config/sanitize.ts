import { EquipmentStatusDictionary } from "core/equipment";
import { SubjectConfig } from "./type";
import { Equipment } from "./equipment";

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
 */
export function sanitizeConfig(config: SubjectConfig): SubjectConfig {
    return {
        ...config,
        equipment: sanitizeEquipment(config.equipment)
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
